//*****************************************************************************
//*****************************************************************************
//
// File editor
//
//*****************************************************************************
//*****************************************************************************

import React, {useState, useEffect} from 'react';
import { useSnackbar } from 'notistack';

import {
  FlexBox, VBox, HBox,
} from "../components/factory";

import {
  Dialog,
  Card, CardContent,
  Button, Checkbox, Icon,
  Switch,
  Breadcrumbs,
  Paper, Box,
  Divider,
  Chip, Link,
  Grid, GridList, GridListTile,
  List, ListItem, ListItemAvatar, ListItemText, ListItemIcon, ListItemSecondaryAction,
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
  Avatar,
  AppBar, Drawer,
  Toolbar, IconButton, Typography, ButtonGroup,
  TextField, InputBase,
  CircularProgress, LinearProgress,
  Tooltip,
} from "@material-ui/core";

const document = require("../../document");

export function FileEditor({fileid}) {
  const [content, setContent] = useState(undefined);
  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    document.load(fileid)
      .then(doc => {
        //doc.story.version.push(JSON.parse(JSON.stringify(doc.story.body)));
        setContent(doc);
        //.catch(e => { console.log(e); })
        ;
        //document.print.rtf();
        enqueueSnackbar(`Loaded ${doc.file.name}`, {variant: "success"});
      })
      .catch(err => enqueueSnackbar(String(err), {variant: "error"}));
  }, [fileid]);

  if(!content) return <p>Loading: {fileid}</p>;

  //return <pre>{JSON.stringify(content, null, 2)}</pre>;
  return (
    <VBox style={{
      paddingLeft: "1.5cm",
      paddingRight: "1.5cm",
      paddingTop: "1cm",
      paddingBottom: "2cm",
      overflowY: "auto",
      }}>
      <ViewPart part={content.story.notes.part[0]}/>
      <ViewPart part={content.story.body.part[0]}/>
    </VBox>
  );
}

function ViewPart({part}) {
  return (
    part.children.map((s, i) => <RenderScene key={i} scene={s} />)
  )
  //return <pre>{JSON.stringify(part, null, 2)}</pre>;

  function RenderScene({scene}) {
    return (
      <div style={{fontFamily: "Times", fontSize: "13pt"}}>
        <p><b>{scene.attr.name}</b></p>
        {scene.children.map((p, i) => <RenderParagraph key={i} p={p} firstline={!i}/>)}
      </div>
    );

    function RenderParagraph({p, firstline}) {
      const style = firstline ? {} : {textIndent: "1cm"};
      return <p style={style}>{p.text}</p>;
    }
  }
}