import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Cell from './Cell/Cell';

const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: theme.palette.common.black,
    // color: theme.palette.common.white,
    fontSize: 16,
    height: 36,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

// const StyledTableRow = withStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.action.hover,
//   },
// }))(TableRow);

const useStyles = theme => ({
  table: {
    minWidth: 50,
  },
  highlightRow: {
    backgroundColor: '#f5f5f5',
  }
});
const currentTime = { "8": 1, "9": 2, "10": 3, "11": 4, "12": 5, "13": 6, "14": 7, "15": 8, "16": 9, "17": 10, "18": 11 }
const sampleTimeTable = '{"0x0":null,"0x1":null,"0x2":{"subjectName":"AI","facultyName":"PSD","meetLink":"https://meet.google.com/vsi-duid-upf","lectureType":0},"0x3":{"subjectName":"IOT","facultyName":"DRD","meetLink":"https://meet.google.com/zpy-qpau-git","lectureType":0},"0x4":null,"0x5":null,"0x6":{"subjectName":"MAD","facultyName":"KVJ","meetLink":"https://meet.google.com/gib-cuik-uma","lectureType":1},"0x7":{"subjectName":"MAD","facultyName":"KVJ","meetLink":"https://meet.google.com/gib-cuik-uma","lectureType":1},"0x8":null,"0x9":null,"0x10":null,"1x0":{"subjectName":"IOT","facultyName":"DRD","meetLink":"https://meet.google.com/zpy-qpau-git","lectureType":1},"1x1":{"subjectName":"IOT","facultyName":"DRD","meetLink":"https://meet.google.com/zpy-qpau-git","lectureType":1},"1x2":{"subjectName":"AI","facultyName":"PSD","meetLink":"https://meet.google.com/vsi-duid-upf","lectureType":0},"1x3":{"subjectName":"IOT","facultyName":"DRD","meetLink":"https://meet.google.com/zpy-qpau-git","lectureType":0},"1x4":null,"1x5":null,"1x6":{"subjectName":"NIS","facultyName":"RSJ","meetLink":"https://meet.google.com/yko-bysx-ksm?pli=1&authuser=1","lectureType":1},"1x7":{"subjectName":"NIS","facultyName":"RSJ","meetLink":"https://meet.google.com/yko-bysx-ksm?pli=1&authuser=1","lectureType":1},"1x8":null,"1x9":null,"1x10":null,"2x0":null,"2x1":null,"2x2":{"subjectName":"AI","facultyName":"PSD","meetLink":"https://meet.google.com/vsi-duid-upf","lectureType":0},"2x3":{"subjectName":"IOT","facultyName":"DRD","meetLink":"https://meet.google.com/zpy-qpau-git","lectureType":0},"2x4":null,"2x5":null,"2x6":null,"2x7":null,"2x8":null,"2x9":null,"2x10":null,"3x0":null,"3x1":null,"3x2":{"subjectName":"DS","facultyName":"NSC","meetLink":"https://meet.google.com/bkp-gtwe-dhh","lectureType":0},"3x3":{"subjectName":"DS","facultyName":"NSC","meetLink":"https://meet.google.com/bkp-gtwe-dhh","lectureType":0},"3x4":null,"3x5":null,"3x6":{"subjectName":"DS","facultyName":"NSC","meetLink":"https://meet.google.com/bkp-gtwe-dhh","lectureType":1},"3x7":{"subjectName":"DS","facultyName":"NSC","meetLink":"https://meet.google.com/bkp-gtwe-dhh","lectureType":1},"3x8":null,"3x9":null,"3x10":null,"4x0":null,"4x1":null,"4x2":{"subjectName":"NIS","facultyName":"RSJ","meetLink":"https://meet.google.com/yko-bysx-ksm?pli=1&authuser=1","lectureType":0},"4x3":{"subjectName":"NIS","facultyName":"RSJ","meetLink":"https://meet.google.com/yko-bysx-ksm?pli=1&authuser=1","lectureType":0},"4x4":{"subjectName":"DS","facultyName":"NSC","meetLink":"https://meet.google.com/bkp-gtwe-dhh","lectureType":0},"4x5":null,"4x6":null,"4x7":null,"4x8":null,"4x9":null,"4x10":null,"5x0":{"subjectName":"AI","facultyName":"PSD","meetLink":"https://meet.google.com/vsi-duid-upf","lectureType":1},"5x1":{"subjectName":"AI","facultyName":"PSD","meetLink":"https://meet.google.com/vsi-duid-upf","lectureType":1},"5x2":null,"5x3":null,"5x4":{"subjectName":"MAD","facultyName":"KVJ","meetLink":"https://meet.google.com/gib-cuik-uma","lectureType":0},"5x5":{"subjectName":"NIS","facultyName":"RSJ","meetLink":"https://meet.google.com/yko-bysx-ksm?pli=1&authuser=1","lectureType":0},"5x6":null,"5x7":null,"5x8":null,"5x9":null,"5x10":null,"6x0":null,"6x1":null,"6x2":null,"6x3":null,"6x4":null,"6x5":null,"6x6":null,"6x7":null,"6x8":null,"6x9":null,"6x10":null}';
const rows = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const times = ['08:00:09:00', '09:00:10:00', '10:00:11:00', '11:00:12:00', '12:00:13:00', '13:00:14:00', '14:00:15:00', '15:00:16:00', '16:00:17:00', '17:00:18:00', '18:00:19:00']
let data = {};
const scrape = (key) => {
  let info = localStorage.getItem(key);
  data[key] = JSON.parse(info);

  //console.log(data)
  //console.log(key)
}

const getTodaysRow = () => {
  let today = new Date();
  let weekDay = today.getDay();

  //return 0;
  return(weekDay - 1);
}

const getTodayColumn = () => {
  let today = new Date();
  let currentHour = today.getHours();
  //console.log(currentTime[currentHour] - 1)
  return currentTime[currentHour] - 1;
  //return 2;
}
const SimpleTable = () => {
  const classes = useStyles();
  let row = -1, column = 0;

  let sample = JSON.parse(sampleTimeTable);
  let keysCollection = Object.keys(sample);
  //console.log(sample[keysCollection[2]])
  keysCollection.forEach(
    (key, index) => {
      if (localStorage.getItem(key) === null || localStorage.getItem(key) === undefined) {
        localStorage.setItem(key, JSON.stringify(sample[key]));
      }
    }
  );

  let todayRow = getTodaysRow();
  let todayCol = getTodayColumn();

  return (

    <TableContainer component={Paper}>
      <Table size="small" aria-label="simple table">
        <TableHead >
          <TableRow>
            <StyledTableCell className={classes.head}>Day</StyledTableCell>
            {
              times.map((time) => (
                <StyledTableCell key={time} align="center">{time}</StyledTableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((temp) => {
            row = row + 1;
            column = -1;
            return (

              <TableRow key={temp}>
                <TableCell component="th" scope="row">
                  <b>{temp}</b>
                </TableCell>
                {
                  times.map((time) => {
                    column = column + 1;
                    return (
                      
                      <TableCell key={temp + time} align="center" padding={"none"}>
                        {scrape(row + "x" + column)}
                        {
                          (todayRow === row ) ?
                          <Cell column={column} row={row} expandCard={true} currentLecture={Boolean(todayCol === column)}/> 
                          :
                          <Cell column={column} row={row} expandCard={false} currentLecture={false}/>
                        }
                        
                      </TableCell>

                    )
                  })
                }
                
                {localStorage.setItem("finalData", JSON.stringify(data))}
                
              </TableRow>

            )

          }

          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default withStyles(useStyles) (SimpleTable);