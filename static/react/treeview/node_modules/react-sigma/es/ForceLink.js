import React from 'react';
import '../sigma/layout.forceLink';
import { embedProps } from './tools';

/**

ForceLink component, starts Force Atlas2 algorythm once component is mounted,
it is advanced version of ForceAtlas2 plugin, but it is not included in the main
distribution script react-sigma.min.js , rather should be imported explicitly:

```
import ForceLink from 'react-sigma/lib/ForceLink'
```

It accepts all the parameters of ForceLink described on its github page:
@param {boolean} barnesHutOptimize  Use the algorithm's Barnes-Hut to improve repulsion's scalability
                  This is useful for large graph but harmful to small ones.
@param {number} barnesHutTheta
@param {boolean} adjustSizes
@param {number} iterationsPerRender
@param {boolean} [linLogMode=true]
@param {boolean} outboundAttractionDistribution
@param {number} edgeWeightInfluence
@param {number} scalingRatio
@param {boolean} strongGravityMode
@param {number} gravity
@param {boolean} alignNodeSiblings
@param {number} nodeSiblingsScale
@param {number} nodeSiblingsAngleMin
@param {boolean} [worker=true]  Use a web worker to run calculations in separate thread
@param {boolean} background
@param {Sigma$Easing} easing  Easing mode
@param {"globally"|"locally"} randomize  Randomize node positions before start
@param {number} slowDown
@param {number} timeout   how long algorythm should run. default=graph.nodes().length * 10

[see sigma plugin page for more details](https://github.com/Linkurious/linkurious.js/tree/develop/plugins/sigma.layouts.forceLink)

@example
import ForceLink from 'react-sigma/lib/ForceLink'
...
<Sigma>
  <LoadJSON path="/public/graph.json">
    <RelativeSize initialSize={8}/>
    <ForceLink background easing="cubicInOut"/>
  </LoadJSON>
</Sigma>

**/

class ForceLink extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = { running: true }, this.render = () => {
      if (this.state.running) return null;
      return React.createElement(
        'div',
        null,
        embedProps(this.props.children, { sigma: this.props.sigma })
      );
    }, _temp;
  }

  componentDidMount() {
    this._refreshGraph();
  }

  // Change sigma status only after react rendering complete
  componentDidUpdate(prevProps, prevState) {
    let s = this.props.sigma;
    if (prevState.running && !this.state.running && s) {
      this._stopForceLink();
      s.refresh();
    } else if (ForceLink._propsChanged(prevProps, this.props)) {
      this._stopForceLink();
      this._refreshGraph();
    }
  }

  componentWillUnmount() {
    this._stopForceLink();
  }

  _stopForceLink() {
    sigma.layouts.stopForceLink();
    if (this.state.timer) clearTimeout(this.state.timer);
    if (this.props.sigma && this.props.sigma.settings) this.props.sigma.settings({ drawEdges: this.state.drawEdges });
  }

  _refreshGraph() {
    let s = this.props.sigma;
    if (!sigma || !s) return;

    let drawEdges = s.settings("drawEdges");
    if (s.graph.edges().length > 1000) s.settings({ drawEdges: false });

    sigma.layouts.configForceLink(s, ForceLink._stripOptions(this.props));
    sigma.layouts.startForceLink(s);
    // TODO: convert running status to state
    let timer = setTimeout(() => {
      this.setState({ running: false, timer: undefined });
    }, this.props.timeout || s.graph.nodes().length * 8);
    this.setState({ running: true, timer, drawEdges });
  }

  //strip force atlas options from component props
  static _stripOptions(props) {
    return Object.assign({}, props, { children: undefined, sigma: undefined });
  }

  static _propsChanged(prev, next) {
    for (let key in prev) if (prev[key] !== next[key]) return true;
    return false;
  }
}

ForceLink.defaultProps = {
  worker: true,
  linLogMode: true
};
ForceLink.propTypes = {
  barnesHutOptimize: require('prop-types').bool,
  barnesHutTheta: require('prop-types').number,
  adjustSizes: require('prop-types').bool,
  iterationsPerRender: require('prop-types').number,
  linLogMode: require('prop-types').bool.isRequired,
  outboundAttractionDistribution: require('prop-types').bool,
  edgeWeightInfluence: require('prop-types').number,
  scalingRatio: require('prop-types').number,
  strongGravityMode: require('prop-types').bool,
  slowDown: require('prop-types').number,
  gravity: require('prop-types').number,
  alignNodeSiblings: require('prop-types').bool,
  nodeSiblingsScale: require('prop-types').number,
  nodeSiblingsAngleMin: require('prop-types').number,
  worker: require('prop-types').bool.isRequired,
  background: require('prop-types').bool,
  easing: typeof Sigma$Easing === 'function' ? require('prop-types').instanceOf(Sigma$Easing) : require('prop-types').any,
  randomize: require('prop-types').oneOf(['globally', 'locally', 'no']),
  timeout: require('prop-types').number,
  children: require('prop-types').any,
  sigma: typeof Sigma === 'function' ? require('prop-types').instanceOf(Sigma) : require('prop-types').any
};
export default ForceLink;