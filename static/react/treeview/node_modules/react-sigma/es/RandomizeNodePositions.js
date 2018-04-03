import React from 'react';
import { embedProps } from './tools';

/**

RandomizeNodePositions component, sets random positions to all nodes.
Can be used within Sigma component with predefined graph or within graph loader component.

**/

class RandomizeNodePositions extends React.PureComponent {

  constructor(props) {
    super(props);
    if (this.props.sigma) {
      this.props.sigma.graph.nodes().forEach(n => {
        n.x = Math.random();
        n.y = Math.random();
      });
    }
    if (this.props.sigma) this.props.sigma.refresh();
  }

  componentDidMount() {
    if (this.props.sigma) this.props.sigma.refresh();
  }

  render() {
    return React.createElement(
      'div',
      null,
      embedProps(this.props.children, { sigma: this.props.sigma })
    );
  }

}

RandomizeNodePositions.propTypes = {
  children: require('prop-types').any,
  sigma: typeof sigma === 'function' ? require('prop-types').instanceOf(sigma) : require('prop-types').any
};
export default RandomizeNodePositions;