import React from 'react';

interface QuoteContentProps {
    quote: string;
    author?: string;
}

const QuoteContent: React.FC<QuoteContentProps> = ({ quote, author }) => (
    <blockquote style={{ fontStyle: 'italic', borderLeft: '4px solid #ccc', paddingLeft: '1em', margin: '1em 0' }}>
        {quote} ;l;kjhjg
        {author && (
            <footer style={{ marginTop: '0.5em', textAlign: 'right', fontWeight: 'bold' }}>
                — {author} kjkhjg
            </footer>
        )}
    </blockquote>
);
export default QuoteContent;