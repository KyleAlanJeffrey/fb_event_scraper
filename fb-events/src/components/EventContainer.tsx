import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList'
import ImageListItem from '@material-ui/core/ImageListItem'
import ImageListItemBar from '@material-ui/core/ImageListItemBar'
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import React, { useEffect, useState } from 'react';

function EventContainer(props: any) {
  const events = props.events;
  //   events.map((event: any) => (
  //     <li key={event.id} className='event'>
  //       <h3>{event.name}</h3>
  //       <a href={event.eventUrl}>
  //         <img src={event.cover_photo.photo.image.uri} alt="" />
  //       </a>
  //       <p>{event.event_place.contextual_name}</p>
  //       <p>{event.social_context.text}</p>
  //     </li>
  //   ))
  // }

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'scroll',
    }}>
      <ImageList rowHeight={300} className="">
        {events.map((event: any) => (
          <ImageListItem key={event.id}          >
            <img src={event.cover_photo.photo.image.uri} alt="" />
            <ImageListItemBar
              title={event.name}
              subtitle={<span>{event.social_context.text}</span>}
              actionIcon={
                <IconButton href={event.eventUrl} style={{ color: 'rgba(255, 255, 255, 0.54)' }}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}


export default EventContainer