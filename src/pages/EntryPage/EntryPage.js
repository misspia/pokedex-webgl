import React from 'react';
import * as S from './EntryPage.styles';

export default class EntryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  
  componentDidMount() {

  }

  render() {
    return (
      <S.Container>
        National No { this.props.match.params.nationalNo}
      </S.Container>
    );
  }
}