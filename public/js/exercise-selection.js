document.addEventListener('DOMContentLoaded', function () {
    const activitySelect = document.getElementById('activity');
    const distanceLabel = document.getElementById('distance-label');
    const distanceInput = document.getElementById('distance');

    function toggleDistanceField() {
        const selectedActivity = activitySelect.value;
        if (selectedActivity === 'Running' || selectedActivity === 'Walking' || selectedActivity === 'Swimming' || selectedActivity === 'Cycling') {
            distanceLabel.style.display = 'block';
            distanceInput.style.display = 'block';
        } else {
            distanceLabel.style.display = 'none';
            distanceInput.style.display = 'none';
        }
    }

    toggleDistanceField();
    activitySelect.addEventListener('change', toggleDistanceField);
});