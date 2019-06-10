<template>
  <article class="post">
    <div class="activity-title-wrapper">
      <h4 class="activity-title">{{ activity.title }}</h4>
      <i 
        class="fas fa-cog activity-settings"
        @click="isSettingsDisplay = !isSettingsDisplay" />
    </div>
    <p>{{ textUtility_capitalize(categories[activity.category].text) }}</p>
    <p>{{ activity.notes }}</p>
    <div class="media">
      <div class="media-left">
        <p class="image is-32x32">
          <img src="../assets/user.png">
        </p>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <a href="#">Zhorov Bohdan</a>
            updated {{ activity.updatedAt | prettyTime }} &nbsp;
          </p>
        </div>
      </div>
      <div class="media-right">
        <span>Progress: <span :class="progressStyle">{{ activity.progress }} %</span></span>
      </div>
    </div>
    <div 
      v-if="isSettingsDisplay"
      class="activity-controll">
      <a 
        href="" 
        class="button is-warning"
        @click.prevent="$emit('toggleUpdate', true)">Edit</a>
      <a 
        href="" 
        class="button is-danger"
        @click.prevent="deleteActivity">Delete</a>
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
        isSettingsDisplay: false
      }
    },
    computed: {
      progressStyle() {
        if (this.activity.progress <= 0) {
          return 'color-red'
        } else if (this.activity.progress <= 50) {
          return 'color-orange'
        } else {
          return 'color-green'
        }
      }
    },
    methods: {
      deleteActivity() {
        store.deleteActivity(this.activity)
      }
    }
}
</script>
 
<style lang="scss" scoped>


.activity-title {
  margin-bottom: 5px;
  display: inline-block;
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
