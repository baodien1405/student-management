import { Box, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { CallMade, CallReceived, EmojiPeople, PregnantWoman } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import StatisticItem from './components/StatisticItem';
import StudentRankingList from './components/StudentRankingList';
import Widget from './components/Widget';
import { dashboardActions, selectDashboardLoading, selectDashboardStatistics, selectHighestStudentList, selectLowestStudentList, selectRankingByCityList } from './dashboardSlice';

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    paddingTop: theme.spacing(1)
  },
  loading: {
    position: "absolute",
    top: theme.spacing(-1),
    width: "100%",
  }
}))

export default function Dashboard () {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDashboardLoading);
  const statistics = useAppSelector(selectDashboardStatistics);
  const highestStudentList = useAppSelector(selectHighestStudentList);
  const lowestStudentList = useAppSelector(selectLowestStudentList);
  const rankingByCityList = useAppSelector(selectRankingByCityList);

  const classes = useStyles();

  console.log({
    loading,
    statistics,
    highestStudentList,
    lowestStudentList,
    rankingByCityList
  })

  useEffect(() => {
    dispatch(dashboardActions.fetchData())
  }, [dispatch])

  return (
    <Box className={classes.root}>
      {/* loading */}
      {loading && <LinearProgress className={classes.loading} />}

      {/* Statistics Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem icon={<EmojiPeople fontSize="large" color="primary" />} label="male" value={statistics.maleCount} />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem icon={<PregnantWoman fontSize="large" color="primary" />} label="female" value={statistics.femaleCount} />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem icon={<CallMade fontSize="large" color="primary" />} label="mark >= 8" value={statistics.highMarkCount} />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem icon={<CallReceived fontSize="large" color="primary" />} label="mark <= 5" value={statistics.lowMarkCount} />
        </Grid>
      </Grid>

      {/* All student by ranking */}
      <Box mt={5}>
        <Typography variant="h4" >All Students</Typography>

        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <Widget title="Student with highest mark">
                <StudentRankingList studentList={highestStudentList} />
              </Widget>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <Widget title="Student with lowest mark">
                <StudentRankingList studentList={lowestStudentList} />
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Ranking by city */}
      <Box mt={5}>
        <Typography variant="h4" >Ranking by city</Typography>

        <Box mt={2}>
          <Grid container spacing={3}>
            {rankingByCityList.map(ranking => (
              <Grid item key={ranking.cityId} xs={12} md={6} lg={3}>
                <Widget title={ranking.cityName}>
                  <StudentRankingList studentList={ranking.rankingList} />
                </Widget>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
