import React, {Fragment, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardHeader, CardTitle, CardText, Button, CardFooter, Input,
    Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, FormText, Table } from 'reactstrap';
import {alertService, appService} from '../../../services/index'
import style from '../style.module.css';
import Select from 'react-select';
import cx from 'classnames';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ManageSource = () => {
    const [{
        logged_in_user_source_list,
        team_source_list,
        team_source_count,
        logged_in_user_source_count,
        all_checkbox_selected,
        logged_in_source_multiple_selected,
        team_all_checkbox_selected,
        team_source_multiple_selected
    }, setState] = useState({
        logged_in_user_source_list : [],
        team_source_list: [],
        logged_in_user_source_count:0,
        team_source_count: 0,
        all_checkbox_selected: false,
        team_all_checkbox_selected: false,
        logged_in_source_multiple_selected: false,
        team_source_multiple_selected: false
    });

    const actionDoneForTeam = () =>{
        var arrOfList = team_source_list;
        arrOfList.forEach ((elem, index)=>{
            arrOfList[index].is_checked = false
        });
        setState(prevState=>({
            ...prevState,
            team_all_checkbox_selected:false,
            team_source_list: arrOfList,
            team_source_multiple_selected: false
        }))
    }

    const actionDoneForSelf = () =>{
        var arrOfList = logged_in_user_source_list;
        arrOfList.forEach ((elem, index)=>{
            arrOfList[index].is_checked = false
        });
        setState(prevState=>({
            ...prevState,
            all_checkbox_selected:false,
            logged_in_user_source_list: arrOfList,
            logged_in_source_multiple_selected: false
        }))
    }

    const selectAllForTeam = () => {
        var currState = !team_all_checkbox_selected;
        var arrOfList = team_source_list;
        
        var multi;
        if(currState == true){
            arrOfList.forEach ((elem, index)=>{
                arrOfList[index].is_checked = true
            });
            multi = true
        }else{
            arrOfList.forEach ((elem, index)=>{
                arrOfList[index].is_checked = false
            });

            multi = false
        }

        setState(prevState=>({
            ...prevState,
            team_all_checkbox_selected:!team_all_checkbox_selected,
            team_source_list: arrOfList,
            team_source_multiple_selected: multi
        }))
    }
    const selectAll = () => {
        var currState = !all_checkbox_selected;
        var arrOfList = logged_in_user_source_list;
        
        var multi;
        if(currState == true){
            arrOfList.forEach ((elem, index)=>{
                arrOfList[index].is_checked = true
            });
            multi = true
        }else{
            arrOfList.forEach ((elem, index)=>{
                arrOfList[index].is_checked = false
            });

            multi = false
        }

        setState(prevState=>({
            ...prevState,
            all_checkbox_selected:!all_checkbox_selected,
            logged_in_user_source_list: arrOfList,
            logged_in_source_multiple_selected: multi
        }))
    }
    
    const checkIfALlCheckBoxSelectedForTeam = (id) =>{
        var arrOfLoggedInSources = team_source_list;
        var selectedSource = arrOfLoggedInSources.findIndex(item => {return item._id == id});
        arrOfLoggedInSources[selectedSource].is_checked = !arrOfLoggedInSources[selectedSource].is_checked;
        const uncheckedElems = arrOfLoggedInSources.filter(function (task, index, array) {
            return (task.is_checked == false)
        });

        const checkedElems = arrOfLoggedInSources.filter(function (task, index, array) {
            return (task.is_checked == true); 
        });

        if (checkedElems.length == arrOfLoggedInSources.length){
            setState(prevState=>({
                ...prevState,
                team_source_list:arrOfLoggedInSources,
                team_all_checkbox_selected: true,
                team_source_multiple_selected: true
            }))
        }else if(checkedElems.length != arrOfLoggedInSources.length && checkedElems.length > 0){
            setState(prevState=>({
                ...prevState,
                team_source_list:arrOfLoggedInSources,
                team_all_checkbox_selected: false,
                team_source_multiple_selected: true
            }))
        }else{
            setState(prevState=>({
                ...prevState,
                team_source_list:arrOfLoggedInSources,
                team_all_checkbox_selected: false,
                team_source_multiple_selected: false
            }))        
        }

    }


    const checkIfALlCheckBoxSelected = (id) =>{
        var arrOfLoggedInSources = logged_in_user_source_list;
        var selectedSource = arrOfLoggedInSources.findIndex(item => {return item._id == id});
        arrOfLoggedInSources[selectedSource].is_checked = !arrOfLoggedInSources[selectedSource].is_checked;
        const uncheckedElems = arrOfLoggedInSources.filter(function (task, index, array) {
            return (task.is_checked == false)
        });

        const checkedElems = arrOfLoggedInSources.filter(function (task, index, array) {
            return (task.is_checked == true); 
        });
        if (checkedElems.length == arrOfLoggedInSources.length){
            setState(prevState=>({
                ...prevState,
                logged_in_user_source_list:arrOfLoggedInSources,
                all_checkbox_selected: true,
                logged_in_source_multiple_selected: true
            }))
        }else if(checkedElems.length != arrOfLoggedInSources.length && checkedElems.length > 0){
            setState(prevState=>({
                ...prevState,
                logged_in_user_source_list:arrOfLoggedInSources,
                all_checkbox_selected: false,
                logged_in_source_multiple_selected: true
            }))
        }else{
            setState(prevState=>({
                ...prevState,
                logged_in_user_source_list:arrOfLoggedInSources,
                all_checkbox_selected: false,
                logged_in_source_multiple_selected: false
            }))
        }

    }


    const confirmDelete = (arr) =>{
        var arrOfIds = []; 
        arr.forEach((elem, index)=>{
            if(elem.is_checked == true){
                arrOfIds.push(elem._id);        
            }
        })
        var source_id = arrOfIds.join(',');
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className={style.cutomAlertBox}>
                        <h1>Are you sure?</h1>
                        <p>You want to delete this source?</p>
                        <button onClick={onClose}>No</button>
                        <button
                            onClick={() => {
                                deleteSource(source_id);
                                onClose();
                            }}
                        >
                            Yes, Delete it!
                        </button>
                    </div>
                );
            }
        })

    }

    const options = [
        {value:"ON", label:"On"},
        {value:"OFF", label:"Off"},
        {value:"CONTINUOUS", label:"Continuous"},
        {value:"DAILY", label:"Daily"},
        {value:"DAILY-DIGEST", label:"Daily Digest"}
    ]
    useEffect(()=>{
        GetAddedAppSources();
        GetTeamAppSources();
    },[])

    
    const deleteSource = (source_id) => {
        var del_source = new Promise((resolve, reject)=>{
            var req = {
                source_id: source_id
            }
    
            appService.deleteSource(req).then(res=>{
                if(res.success == true){
                    resolve("Source deleted succesfully");
                    GetAddedAppSources();
                    GetTeamAppSources();
                    return;
                }else{
                    reject(res.error);
                    return;
                }
            }).catch(err=>{
                reject("Eror Occurred");
                return;
            })
        })
        alertService.throwPromise(del_source);
    }
    
    
    const GetAddedAppSources = () => {
        try{
            appService.getAllSourceUserWise().then(res=>{
                if(res.success == true){
                    res.data.forEach((elem,index)=>{
                        res.data[index]["is_checked"] = false;
                    })
                    setState((prevState)=>({
                        ...prevState,
                        logged_in_user_source_list: res.data,
                        logged_in_user_source_count: res.data.length
                    }));
                }else{
                    alertService.throwError(res.error);
                }
            }).catch(err=>{
                alertService.throwError("Error occured");
            })
        }catch(err){
            alertService.throwError("Error occured");
        }
    }
    const GetTeamAppSources = () =>{
        try{
            appService.getAllSourceOfTeam().then(res=>{
                if(res.success == true){
                    res.data.forEach((elem,index)=>{
                        res.data[index]["is_checked"] = false;
                    })
                    setState((prevState)=>({
                        ...prevState,
                        team_source_list: res.data,
                        team_source_count: res.data.length
                    }));
                }else{
                    alertService.throwError(res.error);
                }
            }).catch(err=>{
                alertService.throwError("Error occured");
            })
        }catch(err){
            alertService.throwError("Error occured");
        }
    }
    return(
        <Fragment>
            <div>
                <h5 className={style.manageSourcesHeader}>Manage Sources</h5>
                <h5 className={style.manageSourcesSubHeader}>Track sources, adjust review email frequency and translations. <Link>Learn more</Link> →</h5>
                <Card>
                    <CardHeader className={style.customCardHeader}>
                        My Sources {logged_in_user_source_count>0? <>({logged_in_user_source_count} Sources)</>: <></>}
                        {logged_in_source_multiple_selected == true?
                            <div className={style.headerButtons}>
                                <Button onClick={(e)=>confirmDelete(logged_in_user_source_list)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                                    &nbsp; Delete Source
                                </Button>
                                <Button onClick={(e)=>actionDoneForSelf()}>
                                    Done
                                </Button>
                            </div>
                            :
                            <Link to="addSource" className={style.headerButtons}>
                                <Button >
                                    <svg width="16" height="16" viewBox="0 0 16 16" class="i-icon"><path d="M9 7V3.995C9 3.455 8.552 3 8 3c-.556 0-1 .446-1 .995V7H3.995C3.455 7 3 7.448 3 8c0 .556.446 1 .995 1H7v3.005c0 .54.448.995 1 .995.556 0 1-.446 1-.995V9h3.005c.54 0 .995-.448.995-1 0-.556-.446-1-.995-1H9z" fill-rule="evenodd"></path></svg>
                                    &nbsp; Add Source
                                </Button>
                            </Link>
                        }

                        
                    </CardHeader>
                    {/* {logged_in_user_source_list && logged_in_user_source_list.length > 0?
                        <CardHeader className={style.customCardHeaderTableHeader}>
                            <Table responsive className = {style.headerTable}>
                                <tbody>
                                    <tr>
                                        <th style={{width:"3%"}}><input type="checkbox"></input></th>
                                        <th style={{width:"7%"}}></th>
                                        <th style={{width:"35%"}}>Source Name</th>
                                        <th>Translate</th>
                                        <th>Review Mails</th>
                                        <th style={{textAlign:"center",verticalAlign:"middle"}}>Integrations</th>
                                        <th></th>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardHeader>:<></>
                    } */}
                    <CardBody className = {style.customeCardBodyTableContainer}>
                        {logged_in_user_source_list && logged_in_user_source_list.length > 0?
                            <div className = {style.fixTableHead}>
                                <Table className = {style.headerTable}>
                                    <thead className = {style.headerTableThead}>
                                        <tr>
                                            <th className={style.headerTableTheadElems} style={{width:"3%"}}>
                                                <input className="selectAllBtnForSelfSource" onClick={(e)=>selectAll()} checked={all_checkbox_selected} type="checkbox"></input>
                                            </th>
                                            <th className={style.headerTableTheadElems} style={{width:"7%"}}></th>
                                            <th className={style.headerTableTheadElems} style={{width:"35%"}}>Source Name</th>
                                            <th className={style.headerTableTheadElems}>Translate</th>
                                            <th className={style.headerTableTheadElems}>Review Mails</th>
                                            <th className={style.headerTableTheadElems} style={{textAlign:"center",verticalAlign:"middle"}}>Integrations</th>
                                            <th className={style.headerTableTheadElems}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {logged_in_user_source_list.map(function(app, i){
                                            return(
                                                <tr>
                                                    <td style={{width:"3%"}}>
                                                        <input onClick={(e)=>checkIfALlCheckBoxSelected(app._id)} className="selectIndividualBtnForSelfSource" checked={app.is_checked} type="checkbox"></input>
                                                    </td>
                                                    <td style={{width:"7%"}}>
                                                        <div className={style.imageIconContainer}>
                                                            <img className={style.appIconHolder} src={app.app_icon}></img>
                                                        </div>
                                                    </td>
                                                    <td style={{width:"35%"}}>
                                                        {
                                                            <>
                                                                <p className={style.appTitleContainer}> {app.app_title}</p>
                                                                <p className={style.appSourceTypeTextContainer}> 
                                                                {
                                                                    app.store_type == "GOOGLE_PLAY_STORE"?
                                                                    <> 
                                                                        <img height="15" width="15" alt="App Store Icon" src="https://img.icons8.com/cute-clipart/2x/apple-app-store.png"></img>
                                                                        <span className={style.storeTypeNameContainer}>iOS</span>
                                                                    </>:
                                                                    <>
                                                                        <img height="15" width="15" alt="Google Play icon" src="https://img.icons8.com/fluency/2x/google-play.png"></img>
                                                                        <span className={style.storeTypeNameContainer}>Google Play Store</span>
                                                                    </>
                                                                }
                                                                </p>
                                                            </>
                                                        }
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <label className={style.switch}>
                                                                <input type="checkbox" id="togBtn"  />
                                                                <div className={cx(style.slider, style.round)}>
                                                                    <span className={style.on}>On</span>
                                                                    <span className={style.off}>Off</span>
                                                                </div>
                                                            </label>
                                                        </div>

                                                    </td>
                                                    <td>
                                                        <Select 
                                                            options={options} 
                                                        />

                                                    </td>
                                                    <td style={{textAlign:"center",verticalAlign:"middle"}}>
                                                        <Button className={style.addIntegrationBtn}>
                                                            <svg width="16" height="16" viewBox="0 0 16 16" class="i-icon"><path d="M9 7V3.995C9 3.455 8.552 3 8 3c-.556 0-1 .446-1 .995V7H3.995C3.455 7 3 7.448 3 8c0 .556.446 1 .995 1H7v3.005c0 .54.448.995 1 .995.556 0 1-.446 1-.995V9h3.005c.54 0 .995-.448.995-1 0-.556-.446-1-.995-1H9z" fill-rule="evenodd"></path></svg>
                                                        </Button>
                                                    </td>
                                                    <td>
                                                        <Button className={style.actionBtn}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                                                                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                                                                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                                                            </svg>
                                                        </Button>
                                                        <Button onClick={(e)=>confirmDelete(logged_in_user_source_list)} className={style.actionBtn}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                            </svg>
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </div>:
                            <CardText className={style.customCardText}>
                                You have not added any sources yet tap <b>Add Source</b> button to add.
                            </CardText>
                        }
                    </CardBody>
                </Card>
                <Card className={style.customCardHeaderSecondary}>
                    <CardHeader className={cx(style.customCardHeader)}>
                        Team Sources ({team_source_count} Sources)

                        {team_source_multiple_selected == true?
                            <div className={style.headerButtons}>
                                <Button onClick={(e)=>confirmDelete(team_source_list)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                                    &nbsp; Delete Source
                                </Button>
                                <Button onClick={(e)=>actionDoneForTeam()}>
                                    Done
                                </Button>
                            </div>
                            :
                            <Link to="addSource" className={style.headerButtons}>
                                <Button >
                                    <svg width="16" height="16" viewBox="0 0 16 16" class="i-icon"><path d="M9 7V3.995C9 3.455 8.552 3 8 3c-.556 0-1 .446-1 .995V7H3.995C3.455 7 3 7.448 3 8c0 .556.446 1 .995 1H7v3.005c0 .54.448.995 1 .995.556 0 1-.446 1-.995V9h3.005c.54 0 .995-.448.995-1 0-.556-.446-1-.995-1H9z" fill-rule="evenodd"></path></svg>
                                    &nbsp; Add Source
                                </Button>
                            </Link>
                        }
                    </CardHeader>
                    <CardBody>
                        {team_source_list && team_source_list.length > 0?
                            <div className = {style.fixTableHead}>
                            <Table className = {style.headerTable}>
                                <thead>
                                    <tr>
                                        <th className={style.headerTableTheadElems} style={{width:"3%"}}>
                                            <input checked={team_all_checkbox_selected} onClick={(e)=>selectAllForTeam(e)} type="checkbox"></input>
                                        </th>
                                        <th className={style.headerTableTheadElems} style={{width:"7%"}}></th>
                                        <th className={style.headerTableTheadElems} style={{width:"35%"}}>Source Name</th>
                                        <th className={style.headerTableTheadElems}>Translate</th>
                                        <th className={style.headerTableTheadElems}>Review Mails</th>
                                        <th className={style.headerTableTheadElems} style={{textAlign:"center",verticalAlign:"middle"}}>Integrations</th>
                                        <th className={style.headerTableTheadElems}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {team_source_list.map(function(app, i){
                                        return(
                                            <tr>
                                                <td style={{width:"3%"}}>
                                                    <input onClick={(e)=>checkIfALlCheckBoxSelectedForTeam(app._id)} className="selectIndividualBtnForSelfSource"  checked={app.is_checked} type="checkbox"></input>
                                                </td>
                                                <td style={{width:"7%"}}>
                                                    <div className={style.imageIconContainer}>
                                                        <img className={style.appIconHolder} src={app.app_icon}></img>
                                                    </div>
                                                </td>
                                                <td style={{width:"35%"}}>
                                                    {
                                                        <>
                                                            <p className={style.appTitleContainer}> {app.app_title}</p>
                                                            <p className={style.appSourceTypeTextContainer}> 
                                                            {
                                                                app.store_type == "GOOGLE_PLAY_STORE"?
                                                                <> 
                                                                    <img height="15" width="15" alt="App Store Icon" src="https://img.icons8.com/cute-clipart/2x/apple-app-store.png"></img>
                                                                    <span className={style.storeTypeNameContainer}>iOS</span>
                                                                </>:
                                                                <>
                                                                    <img height="15" width="15" alt="Google Play icon" src="https://img.icons8.com/fluency/2x/google-play.png"></img>
                                                                    <span className={style.storeTypeNameContainer}>Google Play Store</span>
                                                                </>
                                                            }
                                                            </p>
                                                        </>
                                                    }
                                                </td>
                                                <td>
                                                    <div>
                                                        <label className={style.switch}>
                                                            <input type="checkbox" id="togBtn"  />
                                                            <div className={cx(style.slider, style.round)}>
                                                                <span className={style.on}>On</span>
                                                                <span className={style.off}>Off</span>
                                                            </div>
                                                        </label>
                                                    </div>

                                                </td>
                                                <td>
                                                    <Select 
                                                        options={options} 
                                                    />

                                                </td>
                                                <td style={{textAlign:"center",verticalAlign:"middle"}}>
                                                    <Button className={style.addIntegrationBtn}>
                                                        <svg width="16" height="16" viewBox="0 0 16 16" class="i-icon"><path d="M9 7V3.995C9 3.455 8.552 3 8 3c-.556 0-1 .446-1 .995V7H3.995C3.455 7 3 7.448 3 8c0 .556.446 1 .995 1H7v3.005c0 .54.448.995 1 .995.556 0 1-.446 1-.995V9h3.005c.54 0 .995-.448.995-1 0-.556-.446-1-.995-1H9z" fill-rule="evenodd"></path></svg>
                                                    </Button>
                                                </td>
                                                <td>
                                                    <Button className={style.actionBtn}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                                                            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                                                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                                                        </svg>
                                                    </Button>
                                                    <Button onClick={(e)=>confirmDelete(app._id)} className={style.actionBtn}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                        </svg>
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </div>
                            :
                            <CardText className={style.customCardText}>
                                No on else in your team has added a source yet. Once they do, they will appear here.

                                <p className={style.inviteTeamButton}>
                                    <Button>Invite Your Team</Button>
                                </p>
                            </CardText>
                        }
                    </CardBody>
                </Card>
            </div>
        </Fragment>
    );
}

export default ManageSource;