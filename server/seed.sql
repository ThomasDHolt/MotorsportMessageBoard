CREATE TABLE messages (
  msg_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  content TEXT,
  sender TEXT,
  rating INT,
  date DATE,
  likes INT
);

INSERT INTO messages (content, sender, rating, date, likes) VALUES 
  ('Amazing venue, racing was brilliant. Def coming next year! #N24', 'Stephanie Jones', 5, '2025-06-23', 0),
  ('Got to see the Dacia Logan for the first time, soooo quick!', 'Felix', 4, '2025-06-23', 0),
  ('Ran out of beer!', 'Darren', 2, '2025-06-23', 0)