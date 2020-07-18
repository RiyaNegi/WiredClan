import React from 'react';
import help1 from './help1.jpeg';
import help2 from './help2.jpeg';

export default function () {
  return (
    <div>
      <ol>
        <li className="mb-1">
          Upload a video to YouTube.
        </li>
        <li className="mb-3">
          <div>Mark the video as public (or unlisted if you want privacy on YouTube).</div>
          <img src={help1} alt='img' width="75%" />
        </li>
        <li className="mb-3">
          <div>Copy-paste the video link in the "Insert/Edit Media" button on the toolbar!</div>
          <img src={help2} alt='img' width="75%" />
        </li>
      </ol>

    </div>
  )
}