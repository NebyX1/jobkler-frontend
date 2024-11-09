import React, { useState, useEffect } from 'react';
import { useGetReviews } from '@/api/hooks/reviews/useGetReviews';
import ReactPaginate from 'react-paginate';
import { FaStar } from 'react-icons/fa';
import { Card } from 'react-bootstrap';
import styles from '@/styles/showreviews.module.css';

const ShowReviews = ({ profileId }) => {
  const { data: reviews = [], isLoading, isError } = useGetReviews(profileId);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const pageCount = Math.ceil(reviews.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentReviews = reviews.slice(offset, offset + itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <FaStar key={i} className={i < rating ? styles.filledStar : styles.star} />
      ));
  };

  return (
    <div className={styles.reviewsContainer}>
      <h3 className={styles.sectionTitle}>Reseñas</h3>
      {isLoading ? (
        <p>Cargando reseñas...</p>
      ) : isError ? (
        <p>Error al cargar las reseñas.</p>
      ) : reviews.length === 0 ? (
        <p className={styles.noReviews}>Este perfil aún no tiene reseñas.</p>
      ) : (
        <>
          {currentReviews.map((review) => (
            <Card key={review.id} className={styles.reviewCard}>
              <Card.Body>
                <div className={styles.reviewHeader}>
                  <Card.Title className={styles.reviewerName}>{review.user}</Card.Title>
                  <Card.Subtitle className={styles.reviewDate}>
                    {new Date(review.created_at).toLocaleDateString()}
                  </Card.Subtitle>
                </div>
                <div className={styles.starRating}>{renderStars(review.stars)}</div>
                <Card.Text className={styles.reviewText}>{review.comment}</Card.Text>
              </Card.Body>
            </Card>
          ))}

          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName={styles.paginationContainer}
            pageClassName={styles.pageItem}
            pageLinkClassName={styles.pageLink}
            previousClassName={styles.pageItem}
            nextClassName={styles.pageItem}
            previousLinkClassName={styles.pageLink}
            nextLinkClassName={styles.pageLink}
            activeClassName={styles.activePage}
            disabledClassName={styles.disabled}
          />
        </>
      )}
    </div>
  );
};

export default ShowReviews;

