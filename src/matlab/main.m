% Load DICOM image
img_spine = dicomread('VOLUMEMERGE/VOLUMEMERGE/IRM DE LA COLONNE CERVICO-DORSO-LOMBAIRE/MobiView - 305/IM-0001-0008.dcm');

% Remap the color scale
img_spine = imadjust(img_spine);

% Display the DICOM Image
figure(1)
imshow(img_spine);
% img_skull = dicomread('MANIX/CER-CT/ANGIO CT/IM-0001-0002.dcm');
% imshow(img_skull,[]);

% Load an image of a user
img_trump = imread('TRUMP/side_full.jpg');
img_trump = flipdim(img_trump,2);
figure(2)
imshow(img_trump);

% Select correspondence points
% cpselect(img_spine, img_trump);

% Calculate the transformation matrix H
A = [];
for i = 1:size(movingPoints,1)
    xx = movingPoints(i,1);
    yy = movingPoints(i,2);
    x = fixedPoints(i,1);
    y = fixedPoints(i,2);
    a1 = -xx*x;
    a2 = -xx *y;
    a3 = -xx;
    a4 = -yy*x;
    a5 = -yy*y;
    a6 = -yy;
    row = [x y 1 0 0 0 a1 a2 a3;
        0 0 0 x y 1 a4 a5 a6];
    A = vertcat(A, row);
end
% Use the SVD method to solve for H
[U D V] = svd(A);
V_lastcolumn = V(:,9);
H = reshape(V_lastcolumn, [3,3]);

% Create a matlab Tform
T1 = maketform('projective', H);
% Apply the Tform to the image
it1 = imtransform(img_spine, T1);

% Display the transformed image
figure(3);
imshow(it1);
