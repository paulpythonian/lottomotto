import React from 'react';
import '../sigma/nodes';

/**

NodeShapes component, interface for customShapes sigma plugin.
It supposes that sigma graph is already in place, therefore component should not be
mounted until graph is available. It can be used within Sigma component if graph is
preloaded, or within loader component, like LoadJSON.

Note! this Component requires "canvas" renderer to work.

Extra node properties:
 - node.type='shape-name' - node shape renderer e.g. node.type='cross'.
 - node.borderColor - e.g. node.borderColor='#FF3333'
Details on shapes configuration and possibility to apply images to nodes, please refer to
[plugin page](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.renderers.customShapes#images).

See [plugin page](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.renderers.customEdgeShapes)
for more datails on implementation.

@param {string} default  set default sigma node renderer to be applied to nodes where type is not set


@example
```
<Sigma renderer="canvas" graph={{nodes:["id0", "id1"], edges:[{id:"e0",source:"id0",target:"id1"}]}}>
	<NodeShapes default="star"/>
</Sigma>
```

@example
Supported shapes
```
type Sigma$Node$Shapes = "def" | "pacman" | "star" | "equilateral" | "cross" | "diamond" | "circle" | "square";
```

**/

class NodeShapes extends React.Component {

	constructor(props) {
		super(props);

		this.render = () => null;

		if (this.props.sigma && this.props.default) this.props.sigma.settings({ defaultNodeType: this.props.default });
	}

}

NodeShapes.propTypes = {
	default: typeof Sigma$Node$Shapes === 'function' ? require('prop-types').instanceOf(Sigma$Node$Shapes) : require('prop-types').any,
	sigma: typeof sigma === 'function' ? require('prop-types').instanceOf(sigma) : require('prop-types').any
};
export default NodeShapes;