import { Dimmer, Loader as SemanticLoader, Image, Segment } from 'semantic-ui-react';

function Loader() {
  return (
    <Segment>
      <Dimmer active inverted>
        <SemanticLoader>Loading</SemanticLoader>
      </Dimmer>

      <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
    </Segment>
  );
}

export default Loader;
