
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import { Card, CardActions, CardHeader, CardMedia, CardTitle, IconButton, FloatingActionButton, CardText, Avatar, GridList, GridTile, Dialog, TextField } from 'material-ui'

import FavBorderIcon from 'material-ui/svg-icons/action/favorite-border';
import ForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';

import style from './style.css'


const CourseCard = ({course}) => (
      <Card className={style['card']} >
        <CardMedia overlay={<CardTitle title={course.name} />}>
          <img src="http://lorempixel.com/600/337/nature/"/>
        </CardMedia>
        <div className={style["card-bottom"]}>

          <CardHeader
            className={style["info"]}
            title={course.creator.username}
            subtitle={'Informatik'}
            avatar={<Avatar style={{color: 'red'}}>{course.creator.username.charAt(0)}</Avatar>}/>

          <CardActions className={style['actions']}>
            <IconButton >
              <FavBorderIcon />
            </IconButton>
            <Link to={`/courses/${course._id}`}>
              <IconButton >
                <ForwardIcon  />
              </IconButton>
            </Link>
          </CardActions>
        </div>
      </Card>
)

export default CourseCard
