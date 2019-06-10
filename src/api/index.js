import fakeAPI from "@/lib/fakeAPI";

const generateUid = () => Math.floor(new Date() * Math.random())

export const fetchActivities = () => {
    return fakeAPI.get('activities')
}

export const fetchCategories = () => {
    return fakeAPI.get('categories')
}

export const fetchUsers = () => {
    return {
        name: "Bohdan Zhorov",
        id: "-Aj34jknvncx98812"

    }
}

export const createActivityAPI = (activity) => {
    activity.id = generateUid()
    activity.createdAt = new Date()
    activity.updatedAt = new Date()
    activity.progress = 0

    return fakeAPI.post('activities', activity)
}


export const deleteActivityAPI = (activity) => {
    return fakeAPI.delete('activities', activity)
}
