import axios from 'axios';

const url = 'http://localhost:5000/api/posts/';

class PostService {

    static getPosts() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(post => ({
                        ...post,
                        createdAt: new Date(post.createdAt)
                    }))
                );
            } catch (err) {
                reject(err);
            }
        })
    }
    //create post
    static addPost(uname,fname,lname, email,pass) {
        return axios.post(url, {
            uname,
            fname,
            lname,
            email,
            pass
        });
    }


    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }
    

}

export default PostService;