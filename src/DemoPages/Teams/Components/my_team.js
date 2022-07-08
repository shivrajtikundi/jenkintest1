import React, {Fragment, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardHeader, CardTitle, CardText, Button, CardFooter, Input,
    Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, FormText, Table } from 'reactstrap';
import style from '../style.module.css';
import { alertService, userService, appService } from '../../../services';
import Select from 'react-select';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import logo from "../../../assets/utils/images/review_analytics_logo.png";

const MyTeam = () => {
    const [{
        modalOpen,
        user_name,
        user_email,
        member_list,
        role
    }, setState] = useState(
        {
            modalOpen:false,
            user_name:"",
            user_email:"",
            member_list:[],
            role:"MEMBER"
        }
    );
    const options = [
        {value:"LEADER", label:"Leader"},
        {value:"MEMBER", label:"Member"}
    ]
    useEffect(()=>{
        getAllmembersinTeam();
    },[]);

    const getAllmembersinTeam = () => {
        userService.getAllMembersInTeam().then(res=>{
            if(res.success == true){
                setState((prevState)=>({
                    ...prevState,
                    member_list: res.data
                }))
            }else{
                alertService.throwError(res.error);
            }
        }).catch(err=>{
            alertService.throwError("Error Occurred");
        })
    }
        
    const handleChange = (event) =>{
        var attrname = event.target.name;
        var attrvalue = event.target.value;
        setState((prevState) => ({
            ...prevState,
            [attrname]: attrvalue
        }))
    }

    const handleRoleSelector = (e) =>{
        var role_val = e.value;
        setState((prevState) => ({
            ...prevState,
            role: role_val
        }))
    }
    const inviteMember = () =>{
        var invite_member = new Promise((resolve, reject)=>{
            var req = {
                user_email : user_email,
                user_name : user_name,
                role: role
            }
            userService.addUserInTeam(req).then(res=>{
                if(res.success == true){
                    resolve("Invited Successfully");
                    getAllmembersinTeam();
                    setState((prevState)=>({
                        ...prevState,
                        user_email: "",
                        user_name: "",
                        modalOpen: false
                    }))
                }else{
                    reject(res.error);
                }
            }).catch(err=>{
                reject("Error Occurred");
            })
        })
        alertService.throwPromise(invite_member);
    }

    const toggleModal = () => {
        setState((prevState) => ({
            ...prevState,
            modalOpen: !modalOpen
        }))
    }

    const getRandomColor = () =>{
        let maxVal = 0xFFFFFF; // 16777215
        let randomNumber = Math.random() * maxVal; 
        randomNumber = Math.floor(randomNumber);
        randomNumber = randomNumber.toString(16);
        let randColor = randomNumber.padStart(6, 0);   
        return `#${randColor.toUpperCase()}`
    }

    const defineRole = (param) =>{
        switch(param) {
            case 'ADMIN':
                return 'Team Admin';
            case 'LEADER':
                return 'Team Leader';
            case 'MEMBER':
                return 'Team Member';
            default:
                return 'Team Member';
        }
    }

    const getinitials = (nameString) =>{
        const fullName = nameString.split(' ');
        const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
        return initials.toUpperCase();
    }
    const confirmDelete = (id) =>{
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className={style.cutomAlertBox}>
                        <h1>Are you sure?</h1>
                        <p>You want to delete this user?</p>
                        <button onClick={onClose}>No</button>
                        <button
                            onClick={() => {
                                delUserFromTeam(id);
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

    const delUserFromTeam = (id) =>{
        var del_user_from_team = new Promise((resolve, reject)=>{
            var req = {
                user_id : id
            }
            userService.delUserFromTeam(req).then(res=>{
                if(res.success == true){
                    resolve("User deleted successfully");
                    getAllmembersinTeam();
                    return;
                }else{
                    reject(res.error);
                    return;
                }
            }).catch(err=>{
                reject("Error Occurred");
                return;
            });
        })
        alertService.throwPromise(del_user_from_team);
    }

    const promote = (id) => {
        var promote_user = new Promise((resolve, reject)=>{
            var req = {
                role: "LEADER",
                user_id : id
            }
            userService.updateRoleOfUser(req).then(res=>{
                if(res.success == true){
                    resolve("user promoted to leader successfuly");
                    getAllmembersinTeam();
                    return;
                }else{
                    reject(res.error);
                    return;
                }
            }).catch(err=>{
                reject("Error Occurred");
                return;
            });
        }) 
        alertService.throwPromise(promote_user);
    }

    const demote = (id) => {
        var demote_user = new Promise((resolve, reject)=>{
            var req = {
                role: "MEMBER",
                user_id : id
            }
            userService.updateRoleOfUser(req).then(res=>{
                if(res.success == true){
                    resolve("user demoted to member successfuly");
                    getAllmembersinTeam();
                    return;
                }else{
                    reject(res.error);
                    return;
                }
            }).catch(err=>{
                reject("Error Occurred");
                return;
            });
        })
        alertService.throwPromise(demote_user);
    }

    return(
        <Fragment>
            <Card>
                <CardHeader className={style.customCardHeaderInviteMembers}>Invite Team Members</CardHeader>
                <CardBody>
                    <CardText>
                        Invite Team members and choose which type of access to ReviewAnalytics they have. Team members can track the same sources as you, or can choose different sources to track.
                        Members can only view and edit their account. Leaders can additionally add team members and modify billing. You can learn more about how 
                        Team members and how their roles work in our <Link className={style.customLink}>help docs</Link>.
                    </CardText>
                </CardBody>
            </Card>

            <Card className={style.customTeamMemberCard}>
                <CardHeader className={style.customCardHeader}>
                    <Row>
                        <Col md= "2">
                            <div className={style.myTeamCardHeaderElements}>
                                My Team
                            </div>
                        </Col>
                        <Col md= "8">

                        </Col>
                        <Col md = "2">
                            <div className={style.myTeamCardHeaderElementsSecd}>
                                <Button onClick={(e)=>toggleModal()}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" class="i-icon"><path d="M9 7V3.995C9 3.455 8.552 3 8 3c-.556 0-1 .446-1 .995V7H3.995C3.455 7 3 7.448 3 8c0 .556.446 1 .995 1H7v3.005c0 .54.448.995 1 .995.556 0 1-.446 1-.995V9h3.005c.54 0 .995-.448.995-1 0-.556-.446-1-.995-1H9z" fill-rule="evenodd"></path></svg>
                                    &nbsp; Add Member
                                </Button>  
                            </div>
                        </Col>
                    </Row>
                </CardHeader>
                {member_list.map(function(member, i){
                    return(
                        <CardFooter className={style.customCardFooter}>
                            <Row>
                                <Col md="1">
                                    <div style={{background:getRandomColor()}} className={style.nameInitials}>
                                        {getinitials(member.user_name)}
                                    </div>
                                </Col>
                                <Col md = "3">
                                    <div className={style.memberNameContainer}>
                                        {member.user_name}
                                    </div>
                                </Col>
        
                                <Col md = "5">
                                    <div className={style.memberNameContainer}>
                                        {member.user_email}

                                        <span className={style.roleContainer}>
                                            {member.role && defineRole(member.role)}    
                                        </span>
                                    </div>
                                </Col>
                                <Col md="3">
                                    <div className={style.memberActionBtn}>
                                        {member.role == "LEADER"? 
                                            <Button onClick={(e)=>demote(member._id)} className={style.demoteLeader}>
                                                Remove As Team Leader
                                            </Button>:
                                            <></>
                                        }
                                        {member.role == "MEMBER"? 
                                            <Button onClick={(e)=>promote(member._id)} className={style.promoteLeader}>
                                                Promote To Team Leader
                                            </Button>:
                                            <></>
                                        }
                                        {member.role != "ADMIN"? 
                                            <Button onClick = {(e)=>confirmDelete(member._id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                </svg>
                                            </Button>:<></>
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </CardFooter>
                    );
                })}


            </Card>
            <Modal isOpen={modalOpen}>
                <ModalHeader className={style.customModalHeader} >Invite Member</ModalHeader>
                <ModalBody className={style.customModalBody}>
                    <FormGroup>
                        <Label className={style.customLabel} for="name">Name</Label>
                        <Input onChange={(e)=>handleChange(e)} className={style.customConfirmPassInput} type="text" name="user_name" id="name" placeholder="Enter name" />
                    </FormGroup>
                    <FormGroup>
                        <Label className={style.customLabel} for="email">Email</Label>
                        <Input onChange={(e)=>handleChange(e)} className={style.customConfirmPassInput} type="text" name="user_email" id="email" placeholder="Enter email" />
                    </FormGroup>
                    <FormGroup>
                        <Label className={style.customLabel} for="email">Role</Label>
                        <Select 
                            options={options} 
                            name = "role"
                            onChange = {(e)=>handleRoleSelector(e)}
                        />
                    </FormGroup>
                    
                </ModalBody>
                <ModalFooter className={style.customModalFooter}>
                    <Row style={{display:"block", paddingLeft:"15px", paddingRight:"15px"}}>
                        <Button className={style.savePassBtn} onClick={(e)=>inviteMember()}>Invite</Button>
                        <Button className={style.cancelPassBtn} color="secondary" onClick={(e)=>toggleModal()}>Cancel</Button>
                    </Row>

                </ModalFooter>
            </Modal>
        </Fragment>
    );
}

export default MyTeam;