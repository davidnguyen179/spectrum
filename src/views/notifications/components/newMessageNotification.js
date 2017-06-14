// @flow
import React from 'react';
import {
  parseActors,
  parseEvent,
  parseNotificationDate,
  parseContext,
  getLastMessageCreatedByAnotherUser,
} from '../utils';
import {
  convertTimestampToTime,
  onlyContainsEmoji,
} from '../../../helpers/utils';

import { ActorsRow } from './actorsRow';
import {
  CardLink,
  CardContent,
} from '../../../components/threadFeedCard/style';
import { Bubble, EmojiBubble, ImgBubble } from '../../../components/bubbles';
import Icon from '../../../components/icons';
import {
  MessagesWrapper,
  MessageWrapper,
} from '../../../components/chatMessages/style';
import {
  BubbleGroupContainer,
  NotificationCard,
  TextContent,
  BubbleContainer,
  NotificationListRow,
  Timestamp,
  AttachmentsWash,
  SuccessContext,
  HzRule,
  Content,
} from '../style';

export const NewMessageNotification = ({ notification, currentUser }) => {
  const actors = parseActors(notification.actors, currentUser);
  const event = parseEvent(notification.event);
  const date = parseNotificationDate(notification.modifiedAt);
  const context = parseContext(notification.context, currentUser);
  const message = getLastMessageCreatedByAnotherUser(
    notification.entities,
    currentUser
  );
  const emojiOnly = onlyContainsEmoji(message.content.body);
  const TextBubble = emojiOnly ? EmojiBubble : Bubble;

  return (
    <NotificationCard>
      <CardLink to={`/thread/${notification.context.id}`} />
      <CardContent>
        <SuccessContext>
          <Icon glyph="message-fill" />
          <ActorsRow actors={actors.asObjects} />
        </SuccessContext>
        <Content>
          <TextContent pointer={true}>
            {' '}{actors.asString} {event} {context.asString} {date}{' '}
          </TextContent>
          <AttachmentsWash>
            <HzRule>
              <hr />
              <Icon glyph="message" />
              <hr />
            </HzRule>
            <BubbleContainer me={false}>
              <BubbleGroupContainer me={false}>
                <MessagesWrapper>

                  {message.messageType !== 'media' &&
                    <MessageWrapper
                      me={false}
                      timestamp={convertTimestampToTime(message.timestamp)}
                    >
                      <TextBubble
                        me={false}
                        pending={false}
                        message={message.content}
                      />
                    </MessageWrapper>}
                  {message.messageType === 'media' &&
                    <MessageWrapper
                      me={false}
                      timestamp={convertTimestampToTime(message.timestamp)}
                    >
                      <ImgBubble
                        me={false}
                        pending={false}
                        imgSrc={message.content.body}
                        message={message.content}
                      />
                    </MessageWrapper>}

                </MessagesWrapper>
              </BubbleGroupContainer>
            </BubbleContainer>
          </AttachmentsWash>
        </Content>
      </CardContent>
    </NotificationCard>
  );
};

export const MiniNewMessageNotification = ({
  notification,
  currentUser,
  history,
}) => {
  const actors = parseActors(notification.actors, currentUser);
  const event = parseEvent(notification.event);
  const date = parseNotificationDate(notification.modifiedAt);
  const context = parseContext(notification.context, currentUser);

  return (
    <NotificationListRow
      onClick={() => history.push(`/thread/${notification.context.id}`)}
    >
      <CardLink to={`/thread/${notification.context.id}`} />
      <CardContent>
        <SuccessContext>
          <Icon glyph="message-fill" />
          <ActorsRow actors={actors.asObjects} />
        </SuccessContext>
        <Content>
          <TextContent pointer={false}>
            {actors.asString} {event} {context.asString} {date}
          </TextContent>
        </Content>
      </CardContent>
    </NotificationListRow>
  );
};