import { api } from "@/lib/api";

const postService = {
    getPost(){
        return api.get(`/posts?_limit=10`)
    },
     getPostDetail(id){
        return api.get(`/posts?id=${id}`)
    }
}

export default postService