# Tilleggsstønader søknad

Språklig modell for søknadsdialogen i frontend.

## Language

**Spørsmålsgraf**:
En modell av spørsmål som noder og avhengigheter, brukt for å avgjøre hvilken sti som er aktiv i skjemaet.
_Avoid_: Flytlogikk, if-kjede

**Visningsnode**:
Fellesbegrep for noder som rendres i skjemaet.
_Avoid_: Komponentnode, UI-node

**Spørsmålsnode**:
En visningsnode som representerer et faktisk spørsmål med brukerinput, validering og mulig state-rydding.
_Avoid_: Feltnode, inputnode

**Infonode**:
En visningsnode som kun viser informasjon/varsel og ikke har eget svarfelt.
_Avoid_: Spørsmål, datafelt

**Aktiv node**:
En visningsnode der vilkåret er oppfylt for nåværende svar i søknaden.
_Avoid_: Synlig felt, aktivt element

**Skjemarydding**:
Nullstilling av svar og feilmeldinger for noder som ikke lenger er aktive.
_Avoid_: Full reset, hard reset

**Nodevalidering**:
Valideringsregel definert på visningsnoden, som kan lese både eget felt og andre felt i samme søknadsstate.
_Avoid_: Separat valideringsfil, ekstern regelmatrise

**Predikat**:
Navngitt regel som beskriver når en node eller en gren er aktiv.
_Avoid_: Tilfeldig inline-vilkår, boolsk hjelpekode uten domenenavn
