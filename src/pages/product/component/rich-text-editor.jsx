import React, { Component } from 'react';
import { EditorState, convertToRaw,ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


export default class EditorConvertToHTML extends Component {

    constructor(props) {
        super(props)
        const detail = props.detail
        let editorState
        if (detail) {
            const blocksFromHTML = htmlToDraft(detail);
            const content = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
            );
            editorState = EditorState.createWithContent(content)
        } else {
            editorState = EditorState.createEmpty()
        }
        this.state = {
            editorState
        }
    }
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };
    getDetail = () => {
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    }
    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    editorStyle={{height:200}}
                    onEditorStateChange={this.onEditorStateChange}
                />
            </div>
        );
    }
}