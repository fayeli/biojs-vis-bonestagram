img_spine = dicomread('VOLUMEMERGE/VOLUMEMERGE/IRM DE LA COLONNE CERVICO-DORSO-LOMBAIRE/MobiView - 305/IM-0001-0004.dcm');
imshow(img_spine,[]);

img_skull = dicomread('MANIX/CER-CT/ANGIO CT/IM-0001-0002.dcm');
imshow(img_skull,[]);