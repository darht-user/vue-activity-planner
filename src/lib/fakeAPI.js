import { resolve } from "path";

const data = {
    activities: {},
    categories: {
        "1546969049": { text: "book", id: "1546969049" },
        "1546969225": { text: "movie", id: "1546969225" },
        "1546969050": { text: "activity", id: "1546969050" },
        "1546969051": { text: "task", id: "1546969050" },
        "1546969052": { text: "meet", id: "1546969051" }
    }
}



class fakeAPI {

    fillDB() {
        this.commitData(data)
    }

    commitData(data) {
        localStorage.setItem('activity_data', JSON.stringify(data))
    }

    getData() {
        const activityData = localStorage.getItem('activity_data')
        return JSON.parse(activityData)
    }

    get(resource) {
        return new Promise((resolve, reject) => {
            setTimeout(() =>{
                const data = this.getData()
                resolve({...data[resource]})    
                reject('Cannot fetch' + resource)
            },2000)
        })
    }

    post(resource, item) {
        return new Promise((resolve, reject) => {
            const data = this.getData()
            data[resource][item.id] = item
            this.commitData(data)
            resolve(item)
        })
    }

    delete(resource, item) {
        return new Promise((resolve, reject) => {
            const data = this.getData()
            delete data[resource][item.id]
            this.commitData(data)
            resolve(item)
        })
    }

    

}

export default new fakeAPI()