import React, { useState } from 'react'
import "./EditorPage.css"
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-javascript";
import 'ayu-ace/dark';
import "ayu-ace/light";
import Button from "@material-ui/core/Button"
import SaveIcon from '@material-ui/icons/Save';
import SendIcon from '@material-ui/icons/Send';
import FileSaver from 'file-saver';

const EditorPage = (props) => {
    const [state, setState] = useState();
    const [result, setResult] = useState("");
    const [dark, setDark] = useState({
        bool: "true",
        mode: "ayu-light"
    });
    const handleDarkMode = () => {
        if (dark.bool) {
            setDark({
                bool: false,
                mode: "ayu-dark"
            })
        }
        else {
            setDark({
                bool: true,
                mode: "ayu-light"
            })
        }
    }
    const Savefile = () => {
        const blob = new Blob([state], { type: "text/plain;charset=utf-8" });
        FileSaver.saveAs(blob, "download.txt");

    }
    return (
        <div>
            <div className="Editor_wrapper ">
                <div className="Editor_leftSide flex-child">
                    <div className="Editor_leftSide-top">
                        <h3 className="heading">Online Editor</h3>
                        <img onClick={handleDarkMode} className="darkMode_style" src="https://cdn.iconscout.com/icon/premium/png-256-thumb/night-mode-3514583-2942923.png" srcset="https://cdn.iconscout.com/icon/premium/png-512-thumb/night-mode-3514583-2942923.png 2x" alt="Night Mode Icon" width="28"></img>
                        <Button variant="contained" size="large" color="primary" className="RunButton" endIcon={<SendIcon />} style={{ marginRight: "4px", backgroundColor: "#00539cff" }} onClick={() => {
                            setResult(state)
                        }}>RUN</Button>
                        <Button
                            variant="contained"
                            // color="#1dcdfe"
                            style={{ marginRight: "4px", backgroundColor: "#00539cff" }}
                            size="large"
                            startIcon={<SaveIcon />} onClick={Savefile}>
                            Save
                        </Button>
                    </div>
                    <AceEditor
                        placeholder="Placeholder Text"
                        mode="html"
                        theme={dark.mode}
                        name="blah2"
                        onChange={setState}
                        fontSize={16}
                        height="100vh"
                        width="100%"
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                            showLineNumbers: true,
                        }}
                    />
                </div>
                <div className="Editor_rightSide flex-child">
                    <iframe title="output" srcDoc={result} className="Iframe_Style" />
                </div>
            </div>
        </div>
    )
}

export default EditorPage
