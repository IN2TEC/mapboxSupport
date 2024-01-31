import React from 'react';
import { Container, Typography, Grid, Box, CardContent, Divider } from '@mui/material';
import ReactHtmlParser from "react-html-parser";

const EventInfoContext = (props) => {
    return (
        <Container component="main" maxWidth="xl">
            <Container>
                <Grid
                    container
                    spacing={1}
                    direction="column"
                    justifyContent="space-between"
                    // alignItems="center"
                    alignItems="stretch"
                >
                    {/* <Grid component="main" sx={{ width: '100%' }}> */}
                    <Grid container direction="row" textAlign={{ xs: "center", md: "left" }} spacing={1} >
                        {/* Event Title */}
                        <Grid item xs={12}>
                            <Typography variant="h1" color="primary">
                                {ReactHtmlParser(props?.eventTitle)}
                            </Typography>
                        </Grid>

                        {/* Event Subtitle */}
                        <Grid item xs={12}>
                            <Typography variant="h3" color="white">
                                {ReactHtmlParser(props?.eventSubTitle)}
                            </Typography>
                        </Grid>

                        {/* Event Info */}
                        <Grid item xs={12}>
                            <Typography variant="body" color="white">
                                {ReactHtmlParser(props?.eventInfo)}
                            </Typography>
                        </Grid>

                        {/* Event Agenda */}
                        {props?.eventAgenda &&
                            <Grid
                                item xs={12}
                                container
                                textAlign={{ xs: "center", md: "left" }}
                                sx={{marginTop: 1}}
                            >
                                {props.eventAgenda.map((agendaPoint, index) => (
                                    <Grid item xs={12} key={index}>
                                        <Box sx={{
                                            width: "100%",
                                            height: { xs: 100, md: 100 },
                                            marginTop: 2,
                                            color: 'var(--color-card-text)',
                                            backgroundColor: 'var(--color-card-background)',
                                        }}
                                        >
                                            <CardContent>
                                                <Typography variant="h5" component="div" color="var(--intu-darkGrey)">
                                                    {agendaPoint?.time}
                                                </Typography>
                                                <Typography variant="h6" color="white">
                                                    {agendaPoint?.topic}
                                                </Typography>
                                            </CardContent>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        }
                    </Grid>
                    {/* </Grid> */}
                </Grid>
            </Container>
        </ Container>
    )
}

export default EventInfoContext
