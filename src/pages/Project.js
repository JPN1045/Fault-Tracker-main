import {Button, Container, CircularProgress, Stack, Typography, Paper, ButtonGroup, TextField} from "@mui/material";
import {TicketsTable} from "../components/TicketsTable"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useEffect, useState} from "react";
import {MembersPopover} from "../components/MembersPopover.js";
import {NewTicketFormModal} from "../components/NewTicketFormModal.js";
import {auth, db} from "../firebase-config";
import {doc, deleteDoc, getDoc} from "firebase/firestore";
import {DeletePopover} from "../components/DeletePopover.js";
import RefreshIcon from "@mui/icons-material/Refresh";
import DownloadIcon from '@mui/icons-material/Download';
import LinearProgressWithLabel from "../components/LinearProgressWithLabel.js";
import { CSVLink} from "react-csv";

export const Project = (props) => {
    const [toggleDisable, setToggleDisable] = useState("disabled")
    const [showResolved, setShowResolved] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const projectRef = doc(db, "projects", props.project.id)
    const [ticketList, setTicketList] = useState([]);
    const [progress, setProgress] = useState(0);
    const [search, setSearch] = useState("");
    const [reliab, setReliab] = useState();

    const getTicketList = async () => {
        setIsLoading(true)
        try {
            const docSnap = await getDoc(projectRef);
            const tickets = docSnap.data().tickets;
            setTicketList(tickets);
        } catch (e) {
            console.error(e);
        }
        const resolved = ticketList.filter((ticket) => ticket.status === "Resolved")
        const anymajor = ticketList.filter((ticket) => ticket.priority === "Major" && ticket.status === "Unresolved" )
        setProgress(resolved.length / ticketList.length * 100);
        const a= ticketList.length-resolved.length;
        const b=resolved.length;
        let c= 100.0 - a*1.01;
        if(anymajor.length>0){c=0}
        else if((c+(b/5))<100.0){c=c+b*1.0/5}
        else{c=100.0}
        setReliab(c)
        setIsLoading(false)
    };

    const deleteProject = async (id) => {
        const projectDoc = doc(db, "projects", id);
        await deleteDoc(projectDoc);
        props.getProjectList();
        props.chooseProject(null)
    }

    useEffect(() => {
        if (auth.currentUser.uid === props.project.userId) {
            setToggleDisable("outlined")
        }
        getTicketList();
    },[])

    return (<>
        <Container maxWidth="xl">
            <Paper sx={{p: 4, m: 6}}>
                <Stack
                    sx={{mb: 3}}
                    direction="row"
                    justifyContent="space-between"
                >
                    <Stack
                        direction="row"
                        spacing={0}>
                        <Typography sx={{mt: 1}} variant="h4">
                            {props.project.title}
                        </Typography>
                        <Typography sx={{mt: 1,ml:2}} variant="h6">
                           {reliab}%
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={2}>
                        <TextField sx={{ml: 2, width:300}} placeholder={"Search"} onChange={(c) => {
                            setSearch(c.target.value)
                        }}></TextField>
                        <NewTicketFormModal members={props.project.members} currentUser={auth.currentUser.displayName}
                                            getTicketList={getTicketList} projectRef={projectRef}/>
                        <Button color="info" variant="contained"
                                onClick={() => showResolved ? setShowResolved(false) : setShowResolved(true)}>
                            {showResolved ? 'Show Unresolved' : 'Show Resolved'}
                        </Button>
                        <ButtonGroup size="small" variant="outlined">
                            <DeletePopover toggleDisable={toggleDisable} deleteProject={deleteProject}
                                           project={props.project}/>
                            <MembersPopover project={props.project} projectRef={projectRef}
                                            members={props.project.members}/>
                             <Button style={{paddingTop:'14px'}}>
                                 <CSVLink data={ticketList}><DownloadIcon/></CSVLink>
                                </Button>
                            <Button onClick={getTicketList}>
                                <RefreshIcon/>
                            </Button>
                            <Button onClick={() => props.chooseProject(null)}>
                                <ArrowBackIcon/>
                            </Button>
                        </ButtonGroup>
                    </Stack>
                </Stack>
                <LinearProgressWithLabel value={progress}/>
                {isLoading ? <CircularProgress/> :
                    <TicketsTable members={props.project.members} currentUser={auth.currentUser.displayName}
                                  tickets={ticketList} getTicketList={getTicketList} project={props.project}
                                  projectId={props.project.id}
                                  showResolved={showResolved} search={search}/>}
            </Paper>
        </Container>
    </>)
}
