export default function ShopitemRating({avg,review}){
  return(
    <div className="shopitem_rating">
      <p className="shopitem_rating_p">
        <svg className="shopitem_rating_star" width="24" height="24" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"><path fill="currentColor" fillRule="evenodd" d="M12 19.72l-5.677 2.405c-.76.322-1.318-.094-1.247-.906l.533-6.142-4.042-4.656c-.54-.624-.317-1.283.477-1.467l6.006-1.39L11.23 2.28c.426-.707 1.122-.699 1.542 0l3.179 5.282 6.006 1.391c.805.187 1.011.851.477 1.467l-4.042 4.656.533 6.142c.072.822-.497 1.224-1.247.906L12 19.72z"></path></svg>
        <strong className="shopitem_rating_avg">{avg}</strong>
        리뷰 {review}
      </p>
    </div>
  );
}