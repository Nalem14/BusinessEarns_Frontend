
import MOMENT from "moment";
MOMENT.locale("fr");

export const moment = MOMENT;

export function slugify(str) {
    if (str == undefined || str.length == 0)
        return "";

    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
        .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
        .replace(/\s+/g, "-") // collapse whitespace and replace by -
        .replace(/-+/g, "-"); // collapse dashes

    return str;
}

export function formatDateTime(datetime) {
    return MOMENT(datetime).calendar(null, {
        sameDay: "[Aujourd'hui à] HH:mm",
        nextDay: "[Demain à] HH:mm",
        nextWeek: "dddd [prochain]",
        lastDay: "[Hier à] HH:mm",
        lastWeek: "dddd [à] HH:mm",
        sameElse: "[le] DD/MM/YYYY [à] HH:mm",
    });
}

export function handleErrorMessage(error) {
    console.log(error)
    let errorToShow = "Erreur inconnu.";

    if (typeof error === "string" || error instanceof String) {
        errorToShow = error;
    } else if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if ("errorMessage" in error.response.data)
            errorToShow = error.response.data.errorMessage;
        else if ("error" in error.response.data)
            errorToShow = error.response.data.error;
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        errorToShow =
            "Pas de réponse lors du traitement d'une requête vers l'API.";
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        errorToShow = error.message;
    }

    return errorToShow;
}