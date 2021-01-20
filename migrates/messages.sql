
-- drop table bot_betty_mensages;
CREATE TABLE bot_betty_mensages (
  id serial PRIMARY key,
  message varchar not null,
  project varchar default 'bot-betty'
);


INSERT INTO bot_betty_mensages
  (id, message, project) 
  VALUES 
    (1, 'Betty', 'bot-betty'),
    (2, 'Com quem eu falo?', 'bot-betty'),
    (3, 'Alameda Yaya', 'bot-betty'),
    (4, 'Aqui é uma escola de musica', 'bot-betty'),
    (5, 'Como que pode isso?', 'bot-betty'),
    (6, 'Você revende alguma coisa?', 'bot-betty'),
    (7, 'Será que eles ligam... como que pode isso?', 'bot-betty'),
    (8, 'tá nos fazendo de palhaço', 'bot-betty'),
    (9, 'O meu também é betty', 'bot-betty'),
    (10, 'Será que alguem esta ligando', 'bot-betty'),
    (11, 'Aqui é Gopouva', 'bot-betty'),
    (12, 'É verdade!', 'bot-betty'),
    (13, 'Não, bem não Liguei!', 'bot-betty'),
    (14, 'É deve ser.', 'bot-betty')