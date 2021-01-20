
-- drop table bot_betty_status;
CREATE TABLE bot_betty_status (
  id serial PRIMARY key,
  description varchar not null,
  status boolean,
  channel varchar not null,
  channelID varchar not null,
  channelType varchar default 'text' not null,
  updated_at date NOT NULL DEFAULT CURRENT_DATE,
  created_at date NOT NULL DEFAULT CURRENT_DATE
);