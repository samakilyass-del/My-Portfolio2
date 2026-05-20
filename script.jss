function addRecommendation() {

    let recommendation =
    document.getElementById("new_recommendation");

    if (recommendation.value.trim() != "") {

        let newRecommendation =
        document.createElement("div");

        newRecommendation.className =
        "recommendation";

        newRecommendation.innerHTML =
        recommendation.value;

        document.getElementById("all_recommendations")
        .appendChild(newRecommendation);

        alert("Recommendation added successfully!");

        recommendation.value = "";
    }
}