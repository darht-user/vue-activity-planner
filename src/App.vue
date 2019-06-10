<template>
  <div
    id="activityApp">
    <nav class="navbar is-white topNav">
      <div class="container">
        <div class="navbar-brand">
          <h1>{{ fullAppName }}</h1>
        </div>
      </div>
    </nav>
    <!-- Navbar -->
    <TheNavbar @filterSelected="setFilter" />
    <section class="container">
      <div class="columns">
        <div class="column is-3">
          <ActivityCreate 
            :categories="categories" />
        </div>
        <div class="column is-9">
          <div 
            class="box content"
            :class="{fetching: isFetching, 'has-error': error}">
            <div v-if="error">
              {{ error }}
            </div>
            <div v-else>
              <div v-if="isFetching">
                Loading ...
              </div>
              <div v-if="isDataLoaded">
                <ActivityItem 
                  v-for="activity in filteredActivities" 
                  :key="activity.id" 
                  :categories="categories" 
                  :activity="activity" 
                />
              </div> 
            </div>
            <div v-if="!isFetching">
              <div class="activity-length">Currently {{ activityLength }} activities</div>
              <div class="activity-motivation">{{ activityMotivation }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
 
<script>
import Vue from "vue"
import store from "@/store"
import fakeAPI from "@/lib/fakeAPI"

import TheNavbar from "@/components/TheNavbar";
import ActivityItem from "@/components/ActivityItem";
import ActivityCreate from "@/components/ActivityCreate";
//import { fetchActivities, fetchUsers, fetchCategories, deleteActivityAPI, updatedAPI } from "@/api";
import { debuglog } from 'util';
export default {
  name: "App",
  components: { ActivityItem, ActivityCreate, TheNavbar },
  data() {
    const {state: {activities, categories}} = store
    return {
      creator: "Bohdan Zhorov",
      appName: "Activity Planner",
      user: {},
      activities,
      categories,
      isFetching: false,
      error: null,
      filter: 'all'
    };
  },
  computed: {
    filteredActivities() {
      let filteredActivities = {}
      let condition
      if(this.filter === 'all') {
        return this.activities
      } 
      
      if(this.filter === 'inprogress') {
        condition = (value) => value > 0 && value < 100 
      } else if(this.filter === 'finished') {
        condition = (value) => value === 100
      } else {
        condition = (value) => value === 0
      }

      return Object.values(this.activities)
        .filter(activity => condition(activity.progress))
    },
    fullAppName() {
      return this.appName + " by " + this.creator;
    },
    activityLength() {
      return Object.keys(this.activities).length;
    },
    activityMotivation() {
      if (this.activityLength && this.activityLength < 5) {
        return "Nice to see some activities";
      } else if (this.activityLength >= 5) {
        return "You have many activities! Good job!";
      } else {
        return "No actvities! So sad :(";
      }
    },
    categoryLength() {
      return Object.keys(this.categories).length
    },
    activitiesLength() {
      return Object.keys(this.activities).length
    },
    isDataLoaded() {
      return this.activitiesLength && this.categoryLength
    }
  },
  created() {
    debugger
    if (!localStorage.getItem('activity_data')){
      debugger
      fakeAPI.fillDB()
    }
    //fakeAPI.fillDB()

    this.isFetching = true
    store.fetchActivities()
      .then(activities => {
        this.isFetching = false
      })
      .catch(err => {
        this.error = err
        this.isFetching = false
      })
    store.fetchCategories()
      .then(categories => {
      })
    this.user = store.fetchUsers()
  },
  methods: {
    setFilter(filterOption) {
      this.filter = filterOption
    }
  }
}
</script>

<style>
#activityApp {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html,
body {
  font-family: "Open Sans", serif;
  background: #f2f6fa;
}

footer {
  background-color: #f2f6fa !important;
}

.fetching {
  border: 2px solid orange
}

.has-error {
  border: 2px solid red
}

.activity-length {
  display: inline-block;
}

.activity-motivation {
  float: right;
}

.example-wrapper {
  margin-left: 30px;
}

.topNav {
  border-top: 5px solid #3498db;
}

.topNav .container {
  border-bottom: 1px solid #e6eaee;
}

.container .columns {
  margin: 3rem 0;
}

.navbar-menu .navbar-item {
  padding: 0 2rem;
}

aside.menu {
  padding-top: 3rem;
}

aside.menu .menu-list {
  line-height: 1.5;
}

aside.menu .menu-label {
  padding-left: 10px;
  font-weight: 700;
}

.button.is-primary.is-alt {
  background: #00c6ff;
  background: -webkit-linear-gradient(to bottom, #0072ff, #00c6ff);
  background: linear-gradient(to bottom, #0072ff, #00c6ff);
  font-weight: 700;
  font-size: 14px;
  height: 3rem;
  line-height: 2.8;
}

.media-left img {
  border-radius: 50%;
}

.media-content p {
  font-size: 14px;
  line-height: 2.3;
  font-weight: 700;
  color: #8f99a3;
}

article.post {
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e6eaee;
}

article.post:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

.menu-list li {
  padding: 5px;
}

.navbar-brand > h1 {
  font-size: 31px;
  padding: 20px;
}

.select {
  border-radius: 4px;
  padding-left: 4px;
  border: 1px solid transparent;
  box-shadow: inset 0 1px 2px rgba(10,10,10,.1);
  border-color: #dbdbdb;
}
</style>
