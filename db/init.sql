CREATE DATABASE explainpedia;

\c explainpedia

CREATE TABLE keywords (
    keyword VARCHAR(255),
    explanation TEXT,
    PRIMARY KEY (keyword)
);

