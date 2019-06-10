<template>
  <article class="post">
    <div class="activity-title">
      <!-- <i 
        class="fas fa-cog activity-settings" 
        @click="isSettingsDisplay = !isSettingsDisplay" /> -->
      <input 
        type="text" 
        class="input"
        v-model="modifiedActivity.title">
    </div>
    <div class="activity-category">
      <select 
        class="select"
        v-model="modifiedActivity.category">
        <option 
          disabled 
          value="">Please select one</option>
        <option 
          v-for="category in categories"
          :key="category.id"
          :value="category.id">{{ category.text }}</option>
      </select>
    </div>
    <div class="control activity-notes">
      <textarea 
        class="textarea"
        placeholder="Write some notes here" 
        v-model="modifiedActivity.notes" />
    </div>
    <div class="media">
      <div class="media-left">
        <p class="image is-32x32">
          <img src="../assets/user.png">
        </p>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <a href="#">Bohdan Zhorov</a>updated {{ modifiedActivity.updatedAt | prettyTime }} &nbsp;
          </p>
        </div>
      </div>
      <div class="media-right">
        <!-- TODO: Add v-model here -->
        <input 
          id="progress"
          type="range"
          name="progress"
          min="0" 
          max="100" 
          value="90" 
          step="10"
          v-model.number="modifiedActivity.progress">
        <label for="progress">{{ modifiedActivity.progress }} %</label>
      </div>
    </div>
    <div 
      v-if="isSettingsDisplay" 
      class="activity-controll">
      <!-- TODO: create function 'updateActivity' to console log 'activity' -->
      <a 
        class="button is-warning" 
        @click="activityUpdate">Commit Update</a>
      <!-- TODO: Emit Event to Cancel Edit Mode -->
      <a 
        class="button is-danger" 
        @click="$emit('toggleUpdate', false)">Cancel</a>
    </div>
  </article>
</template>

<script>
import textUtility from "@/mixins/textUtility"
import store from "@/store"
export default {
    mixins: [textUtility],
    props: ['activity', 'categories'],
    data() {
      return {
        modifiedActivity: {...this.activity},
        isSettingsDisplay: true
      }
    },
    methods: {
      activityUpdate() {
        store.updatedActivity(this.modifiedActivity)
          .then(() => {
            this.$emit('toggleUpdate', false)
          })
      }
    }
}
</script>

<style lang="scss" scoped>



.media-right {
  display: flex;
  > input {
    margin-right: 5px;
  }
}

.activity-title {
  width: 100%;
  margin-bottom: 10px;
  display: inline-block;
}

.activity-category {
  margin-bottom: 10px;
}

.activity-notes {
  margin-bottom: 10px;
}

.activity-settings {
  float: right;
  font-size: 22px;
  &:hover {
    cursor: pointer;
  }
}
.activity-controll {
  margin: 20px 0 0 0;
  a {
    margin-right: 5px;
  }
}

.post .title {
  margin-bottom: 5px;
}

.color-red {
  color: red;
}

.color-orange {
  color: orange;
}

.color-green {
  color: green;
}

</style>

