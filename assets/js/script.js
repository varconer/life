document.addEventListener('DOMContentLoaded', function() {
    let scenario = new VcLifeScenario;
    let timer;

    scenario1.onclick = function() {
        scenario.stop(timer);
        scenario.setTwoGlidersCollision();
        timer = scenario.run(game, 200);
    };

    scenario2.onclick = function() {
        scenario.stop(timer);
        scenario.setFourGlidersCollision();
        timer = scenario.run(game, 200);
    };

    scenario3.onclick = function() {
        scenario.stop(timer);
        scenario.setEightGlidersCollision(30);
        timer = scenario.run(game, 200);
    };
});