import { db } from "../../data/database.js";

export async function createReview(mid, pid, content, image, score) {

    const sql = "insert into oh_review(mid,pid,review_content,review_img,review_date,review_score) values(?,?,?,?,sysdate(),?)";
    return db.execute(sql, [mid, pid, content, image, score])
        .then((result) => 'ok')

}

export async function getReview(pid) {

    const sql = "select ov.rid,om.nickname,ifnull(om.userimg,'https://images.unsplash.com/photo-1624274515979-32afb09402a2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQyfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D') userimg,op.product_name,op.rating_avg,ov.review_content,ov.review_img,ov.review_score,substring(review_date,1,10) rdate from oh_review ov inner join oh_product op, oh_member om where op.pid = ov.pid and om.mid = ov.mid and op.pid = ?";
    return db.execute(sql, [pid])
        .then((rows) => rows[0])

}

export async function getReviewCount(pid) {

    const sql = "select count(review_score) as rcount, review_score from oh_review ov inner join oh_product op, oh_member om where ov.pid = op.pid and om.mid = ov.mid and op.pid = ? group by review_score order by review_score asc";
    return db.execute(sql, [pid])
        .then((rows) => rows[0])

}

export async function getReviewAvg(pid) {

    const sql = "select sum(rcount) sum, ifnull((SELECT truncate(AVG(review_score),2) FROM oh_review where pid = ?),0) AS avg_score from (select count(review_score) as rcount, review_score from oh_review ov inner join oh_product op, oh_member om where ov.pid = op.pid and om.mid = ov.mid and op.pid = ? group by review_score) as m"
    return db.execute(sql, [pid, pid])
        .then((rows) => rows[0])

}

export async function getReviewBest(pid) {

    const sql = "select ov.rid,om.nickname,ifnull(om.userimg,'https://images.unsplash.com/photo-1624274515979-32afb09402a2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQyfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D') userimg,op.product_name,op.rating_avg,ov.review_content,ov.review_img,ov.review_score,substring(review_date,1,10) rdate from oh_review ov inner join oh_product op, oh_member om where op.pid = ov.pid and om.mid = ov.mid and op.pid = ? order by review_score desc"
    return db.execute(sql, [pid])
        .then((rows) => rows[0])

}

export async function getReviewLatest(pid) {

    const sql = "select ov.rid,om.nickname,ifnull(om.userimg,'https://images.unsplash.com/photo-1624274515979-32afb09402a2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQyfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D') userimg,op.product_name,op.rating_avg,ov.review_content,ov.review_img,ov.review_score,substring(review_date,1,10) rdate, review_date from oh_review ov inner join oh_product op, oh_member om where op.pid = ov.pid and om.mid = ov.mid and op.pid = ? order by review_date desc"
    return db.execute(sql, [pid])
        .then((rows) => rows[0])
}


export async function getReviewPage(pid, start, end) {

    const sql = "select ov.rid,om.nickname,ifnull(om.userimg,'https://images.unsplash.com/photo-1624274515979-32afb09402a2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQyfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D') userimg,op.product_name,op.rating_avg,ov.review_content,ov.review_img,ov.review_score,substring(review_date,1,10) rdate, review_date, (select ifnull(count(*),1) as cnt from oh_review where pid = ?) cnt from oh_review ov inner join oh_product op, oh_member om where op.pid = ov.pid and om.mid = ov.mid and op.pid = ? and rid between ? and ? order by review_date asc"
    return db.execute(sql, [pid, pid, start, end])
        .then((rows) => rows[0])


}
