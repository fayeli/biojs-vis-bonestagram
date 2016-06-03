function imOut = imoverlay(imIn, imAdd, pos)
%IMOVERLAY takes two images and put them on top of each other with no
%   transparency
%
%   imIn -- The original image (RGB or grayscale)
%   imAdd -- The image that goes on top (RGB or grayscale)
%   pos -- The x and y position where the second image goes on top of the first 
%        -- [x y], where x and y can be negative (will be cropped)
%   imOut -- The output image (same size as original image imIn)
%   
%   If the region of the image on top is outside of the original image,
%   crop out the excessive parts
%   
%   Example
%   ----------------------
%   imIn = imread('pears.png');
%   imAdd = imread('football.jpg');
%   imOut = imoverlay(imIn, imAdd, [30 -80]);
%   imshow(imOut)
%   
%   Copyright 2014 The MathWorks, Inc.

imOut = imIn;
imOut(max(pos(:,1), 1) : min(pos(:,1)+size(imAdd, 1)-1, size(imIn,1)),...
    max(pos(:,2), 1) : min(pos(:,2)+size(imAdd, 2)-1, size(imIn,2)),...
    :) = ...
    imAdd(max(2-pos(:,1), 1) : min(size(imIn,1)-pos(:,1)+1, size(imAdd,1)),...
    max(2-pos(:,2), 1) : min(size(imIn,2)-pos(:,2)+1, size(imAdd,2)),...
    :);
% Remove the background if the image on top has transparent background
imOut(imOut == 255) = imIn(imOut == 255);
end