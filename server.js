const express = require("express");
const app = express();
const port = 3000;

// Middleware pour vérifier l'heure de la requête
const checkTime = (req, res, next) => {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour <= 17) {
    next();
  } else {
    res.send(
      "Désolé, le site est disponible uniquement pendant les heures de travail (du lundi au vendredi, de 9h à 17h)"
    );
  }
};

// Routes
app.get("/", checkTime, (req, res) => {
  res.render("index");
});

app.get("/services", checkTime, (req, res) => {
  res.render("services");
});

app.get("/contact", checkTime, (req, res) => {
  res.render("contact");
});

// Configuration du moteur de template EJS
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Démarrage du serveur
app.listen(port, () => {
  console.log(
    `Le serveur est en cours d'exécution sur http://localhost:${port}`
  );
});
