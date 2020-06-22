const ROUTES = {
  home: "/",
  swipe: "/swipe",
  video: "/video",
  profile: "/profile",
  preview: "/preview",
  dances: "/dances",
  videocss: "/videocss",
  feedback: "/feedback"
};

export { ROUTES };

/* TO DO:

-Video call
  -Gebruikers laten connecten dmv match
  -Bepaalde states instellen
    1/2:
      gebruiker is leerling
      andere gebruiker is teacher
    2/2:
      gebruiker gebruiker is leerling
      andere gebruiker is teacher
    3/2 (nadat de timer afloopt voor de 2e keer):
      Geen timer enkel een hangup button voor beide gebruikers
  -CSS
  -15 minuten timer (daaran verandert state automatisch van 1/2 naar 2/2

-Match
  -Gebruiker die geskipt wordt krijgt automatisch het 'searching' scherm te zien

-Alle previous matches renderen op de '/dances' page

-Laatste 2 matches renderen op homepage

-2 online gebruikers renderen op homepage

-App startup loading screen

-Gebruiker kan gegevens aanpassen op profile page

-Videos kunnen herbekijken van laatste videocall

*/
