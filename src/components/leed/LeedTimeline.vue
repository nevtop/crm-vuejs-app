<template>
    <div id="leed-timeline" class="module-wrapper" style="position: relative;">
        <div class="timeline">
            <div class="card mb-20 ml-20">
                <div class="card-heading"><label for="">Leed Generated</label></div>
                <div class="card-content">
                    <span>Created on<label class="pill-button">23-dec-2020</label></span>
                    <span>Status<label class="pill-button">Record</label></span>
                </div>
            </div>
            <div class="card mb-20 ml-20">
                <div class="card-heading"><label for="">Leed Qualified</label></div>
                <div class="card-content">
                    <span>Created on<label class="pill-button">24-dec-2020</label></span>
                    <span>Status<label class="pill-button">Qualify</label></span>
                </div>
            </div>
            <div class="card mb-20 ml-20">
                <div class="card-heading"><label for="">Consultation Booked</label></div>
                <div class="card-content">
                    <span>Created on<label class="pill-button">24-dec-2020</label></span>
                    <span>Completed on<label class="pill-button">27-dec-2020</label></span>
                    <span>Status<label class="pill-button">Completed</label></span>
                </div>
            </div>
            <div class="card mb-20 ml-20">
                <div class="card-heading"><label for="">Trial Booked</label></div>
                <div class="card-content">
                    <span>Created on<label class="pill-button">27-dec-2020</label></span>
                    <span>Scheduled on<label class="pill-button">28-dec-2020</label></span>
                    <span>Status<label class="pill-button">Pending</label></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.timeline::before {
    content: '';
    position: absolute;
    width: 3px;
    background-color: #008CBA;
    top: 0;
    bottom: 0;
}

.card {
    position: relative;
    display: block;
    border: 1px solid #b3b3b2;
}

.card::before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    left: -29px;
    background-color: white;
    border: 4px solid #008CBA;
    top: 8px;
    border-radius: 50%;
    z-index: 1;
}

.card .card-heading {
    font-size: 20px;
    color: white;
    background-color: #008CBA;
    padding: 5px;
}

.card .card-content {
    display:flex;
    justify-content: space-between;
    padding: 10px 5px;
}

.pill-button {
  background-color: #ddd;
  border: none;
  color: black;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 0px 5px;
  border-radius: 16px;
}
</style>