export type EventType = {
  can_page_viewer_invite_as_user: boolean;
  can_viewer_invite: boolean;
  can_viewer_rsvp: boolean;
  can_viewer_share: boolean;
  cover_photo: {
    photo: { accessibility_caption: string; image: { uri: string } };
  };
  day_time_sentence: string;
  eventUrl: string;
  event_kind: string;
  event_place: {
    __typename: string;
    contextual_name: string;
    __isNode: string;
    id: string;
  };
  going: number;
  id: string;
  if_viewer_can_duplicate_event: boolean;
  interested: number;
  is_happening_now: boolean;
  is_online: false;
  is_online_or_detected_online: boolean;
  is_past: boolean;
  is_viewer_host: boolean;
  live_virtual_event_info: null;
  name: string;
  parent_if_exists_or_self: { online_event_setup: null; id: string };
  social_context: { text: string; ranges: number[] };
  start_timestamp: number;
  ticketing_context_row: { price_range_text: string };
};
