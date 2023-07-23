var recipeContainer = document.querySelector(".recipe");
var timeout = function timeout(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error("Request took too long! Timeout after ".concat(s, " second")));
        }, s * 1000);
    });
}; // https://forkify-api.herokuapp.com/v2
 ///////////////////////////////////////

//# sourceMappingURL=index.01807893.js.map
