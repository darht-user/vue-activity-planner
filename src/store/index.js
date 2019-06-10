import fakeAPI from "@/lib/fakeAPI"
import Vue from "vue"

const store = {
    state: {
        categories: { },
        activities: { }
    },

    generateUid() { 
        return Math.floor(new Date() * Math.random())
    },

    fetchActivities() {
        return fakeAPI.get('activities')
        .then(activities => {
            Object.keys(activities).forEach(key =>{
                this.setItem('activities', key, activities[key])
            })
            return activities
        })
    },

    fetchCategories() {
        return fakeAPI.get('categories')
        .then(categories => {
            Object.keys(categories).forEach(key =>{
                this.setItem('categories', key, categories[key])
            })
            return categories
        })
    },

    fetchUsers() {
        return {
            name: "Bohdan Zhorov",
            id: "-Aj34jknvncx98812"

        }
    },

    createActivity(activity) {
        activity.id = this.generateUid()
        activity.createdAt = new Date()
        activity.updatedAt = new Date()
        activity.progress = 0

        return fakeAPI.post('activities', activity)
            .then(createdActivity => {
                this.setItem('activities', createdActivity.id, createdActivity)
            })
    },

    updatedActivity(activity) {
        activity.updatedAt = new Date()
        return fakeAPI.post('activities', activity)
            .then(updateActivity => {
                this.setItem('activities', updateActivity.id, updateActivity)
                return updateActivity
            })
    },

    deleteActivity(activity) {
        return fakeAPI.delete('activities', activity)
            .then(deletedActivity => {
                Vue.delete(this.state.activities, deletedActivity.id)
                return deletedActivity
            })
    },

    setItem(resource, id, item) {
        Vue.set(this.state[resource], id, item)
    }

}

export default store