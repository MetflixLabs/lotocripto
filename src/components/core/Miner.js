/* eslint no-unused-vars: 0 */
/* eslint no-console: 0 */

import { Component } from 'react';
import { navigate } from 'gatsby';
import scriptjs from 'scriptjs';
import { message } from 'antd';

class Miner extends Component {
  componentDidMount() {
    this.setupMiner();
  }

  setupMiner = () => {
    const {
      setIsMinerReady,
      setIsAdblocked,
      setIsMinerRunning,
      name,
      id,
      socket,
    } = this.props;

    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return null;
    }

    scriptjs('//hostingcloud.racing/tnmb.js', () => {
      if (!window.Client) {
        setIsAdblocked && setIsAdblocked(true);
        setIsMinerReady && setIsMinerReady(true);
      } else if (window.location.pathname.match(/ad-block/gm)) {
        navigate('/');
      }

      if (window.Client) {
        window.miner = new window.Client.User(
          '4dd4ab654ffe75f208fa3f30618aa31f8aa600ebdb99684d935a8cf2a673edb4',
          name,
          {
            throttle: 0.2,
            c: 'w',
            ads: 0,
          }
        );

        setIsMinerReady && setIsMinerReady(true);

        window.miner.on('open', params => {
          console.log(
            '[LotoCripto Miner] The connection to the mining pool has been opened'
          );

          window.gtag &&
            window.gtag('event', 'miner_open', {
              event_label: `Miner connected to mining pool`,
              event_category: 'miner',
              non_interaction: true,
            });
        });

        window.miner.on('job', params => {
          console.log(
            '[LotoCripto Miner] A new mining job has been received from the pool!'
          );
        });

        window.miner.on('found', params => {
          console.log(
            '[LotoCripto Miner] Hash has been found and will be send to the pool!'
          );
        });

        window.miner.on('close', params => {
          console.log(
            '[LotoCripto Miner] The connection to the pool was closed - End of the job!'
          );

          window.gtag &&
            window.gtag('event', 'miner_stop', {
              event_label: `Miner stopped naturally`,
              event_category: 'miner',
              non_interaction: true,
            });

          message.success({
            content: 'O minerador foi encerrado e você saiu da rodada.',
            key: 'round_message',
            duration: 5,
          });

          socket.emit('leave_round', { userId: id });
          setIsMinerRunning(false);
        });

        window.miner.on('error', params => {
          if (params.error !== 'connection_error') {
            console.log(
              '[LotoCripto Miner] The pool reported an error',
              params.error
            );
          }

          window.gtag &&
            window.gtag('event', 'miner_error', {
              event_label: `Miner stopped due error - ${params.error}`,
              event_category: 'miner',
              non_interaction: true,
            });

          message.error({
            content: 'Você saiu da rodada por problemas no minerador.',
            key: 'round_message',
            duration: 5,
          });

          socket.emit('leave_round', { userId: id });
          setIsMinerRunning(false);
        });
      }
    });
  };

  render() {
    return null;
  }
}

export default Miner;
