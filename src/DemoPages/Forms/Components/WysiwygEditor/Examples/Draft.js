// import React, {Component, Fragment} from 'react';
// import {EditorState, convertToRaw} from 'draft-js';
// import {Editor} from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';

// import {
//     Row, Col,
//     Card, CardBody,
//     CardTitle
// } from 'reactstrap';

// export default class FormDraftJsEditor extends Component {
//     state = {
//         editorState: EditorState.createEmpty(),
//     }

//     onEditorStateChange = (editorState) => {
//         this.setState({
//             editorState,
//         });
//     };

//     render() {
//         const {editorState} = this.state;
//         return (
//             <Fragment>
//                 <CSSTransition
//                     component="div"
//                     classNames="TabsAnimation"
//                     appear={true}
//                     timeout={0}
//                     enter={false}
//                     exit={false}>
//                     <Row>
//                         <Col md="12">
//                             <Card>
//                                 <CardBody>
//                                     <CardTitle>DraftJS Editor</CardTitle>
//                                     <Editor
//                                         editorState={editorState}
//                                         wrapperClassName="demo-wrapper"
//                                         editorClassName="demo-editor"
//                                         onEditorStateChange={this.onEditorStateChange}
//                                     />
//                                     <textarea className="form-control mt-3"
//                                               disabled
//                                               value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
//                                     />
//                                 </CardBody>
//                             </Card>
//                         </Col>
//                     </Row>
//                 </CSSTransition>
//             </Fragment>
//         );
//     }
// }
