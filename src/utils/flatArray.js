export default function flatArray(arr){
    let newArr = arr.reduce((pre,current)=>{
        return pre.concat(Array.isArray(current)?flatArray(current):current)
    },[])
    return newArr
}