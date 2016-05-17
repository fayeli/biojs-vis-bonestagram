% Load medical scan image
dental_img = imread('./dental-x-ray2.jpg');

% Create the face detector object.
faceDetector = vision.CascadeObjectDetector();

% Create the point tracker object.
pointTracker = vision.PointTracker('MaxBidirectionalError', 2);

% Create the webcam object
cam = webcam(2);

% Capture one frame to get its size.
videoFrame = snapshot(cam);
frameSize = size(videoFrame);

% Create the video player object.
videoPlayer = vision.VideoPlayer('Position', [100 100 [frameSize(2), frameSize(1)]+30]);

runLoop = true;
numPts = 0;
frameCount = 0;
xformAccumulateStarted = false;

while runLoop && frameCount < 1000

    % Get the next frame.
    videoFrame = snapshot(cam);
    
    % Save some raw frames as test images.
%     if frameCount == 100
%         rawFrame100 = videoFrame;
%     end
%     
%     if frameCount == 101
%         rawFrame101 = videoFrame;
%     end
%     
%     if frameCount == 150
%         rawFrame150 = videoFrame;
%     end
%     
%     if frameCount == 151
%         rawFrame151 = videoFrame;
%     end
%     
%     if frameCount == 200
%         rawFrame200 = videoFrame;
%     end
%     
%     if frameCount == 201
%         rawFrame201 = videoFrame;
%     end
    
    videoFrameGray = rgb2gray(videoFrame);
    
    if numPts <10
        %Detection mode.
        bbox = faceDetector.step(videoFrameGray);
        xformAccumulateStarted = false;
        if ~isempty(bbox)
            % Find corner points inside the detected region.
            points = detectMinEigenFeatures(videoFrameGray, 'ROI', bbox(1, :));
            
            % Re-initialize the point tracker.
            xyPoints = points.Location;
            numPts = size(xyPoints,1);
            release(pointTracker);
            initialize(pointTracker, xyPoints, videoFrameGray);
    
            % Save a copy of the points.
            oldPoints = xyPoints;
            
            % Convert the rectangle represented as [x, y, w, h] into an
            % M-by-2 matrix of [x,y] coordinates of the four corners. This
            % is needed to be able to transform the bounding box to display
            % the orientation of the face.
            bboxPoints = bbox2points(bbox(1, :));
            
            % Scale medical scan to fit bounding box
            w = bbox(3);
            scaled_dental_img = imresize(dental_img, [NaN w]);
            scaled_dental_img_h = size(scaled_dental_img,1);
            scaled_dental_img_w = size(scaled_dental_img,2);
            
            % Convert the box corners into the [x1 y1 x2 y2 x3 y3 x4 y4]
            % format required by insertShape.
            bboxPolygon = reshape(bboxPoints', 1, []);
            
            % Display a bounding box around the detected face.
            videoFrame = insertShape(videoFrame, 'Polygon', bboxPolygon, 'LineWidth', 3);
            
            % Display detected corners.
            videoFrame = insertMarker(videoFrame, xyPoints, '+', 'Color', 'white');
            
            % Overlay medical scan on top of video
            xray_x = bboxPolygon(7);
            xray_y = bboxPolygon(8) - scaled_dental_img_h * 0.9;
            xray_point = [xray_x xray_y];
            videoFrame = imoverlay(videoFrame, scaled_dental_img, [xray_y xray_x]);
            test = videoFrame;
            
            
        end
    else
        % Tracking mode.
        [xyPoints, isFound] = step(pointTracker, videoFrameGray);
        visiblePoints = xyPoints(isFound, :);
        oldInliers = oldPoints(isFound, :);
        
        numPts = size(visiblePoints, 1);
        
        if numPts >= 10
            % Estimate the geometric transformation between the old points
            % and the new points.
            [xform, oldInliers, visiblePoints] = estimateGeometricTransform(...
                oldInliers, visiblePoints, 'similarity', 'MaxDistance', 4);
            
            % Accumulate the transformations to obtain a transformation that
            % is the total transformation of the first frame until this
            % frame
            
            if (~xformAccumulateStarted)
                xform_accum = xform;
                xformAccumulateStarted = true;
            else
                T_accum = xform_accum.T * xform.T;
                xform_accum = affine2d(T_accum);
            end
            
            % Save some of the transformation for testing
%             if frameCount == 100
%                 xForm_at_f100 = xform;
%             end
%             
%             if frameCount == 101
%                 xForm_at_f101 = xform;
%             end
%     
%             if frameCount == 150
%                 xForm_at_f150 = xform;
%             end
%             
%             if frameCount == 151
%                 xForm_at_f151 = xform;
%             end
%     
%             if frameCount == 200
%                 xForm_at_f200 = xform;
%             end
%             
%             if frameCount == 201
%                 xForm_at_f2oo = xform;
%             end
            
            
            % Apply the transformation to the bounding box.
            bboxPoints = transformPointsForward(xform, bboxPoints);
            
            % Apply the transformation to the point location of the medical
            % image
            xray_point = transformPointsForward(xform, xray_point);
            
            % Apply the transformation to the medical image
            transformed_dental_img = imwarp(scaled_dental_img, xform_accum);

            % Convert the box corners into the [x1 y1 x2 y2 x3 y3 x4 y4]
            % format required by insertShape.
            bboxPolygon = reshape(bboxPoints', 1, []);

            % Display a bounding box around the face being tracked.
            videoFrame = insertShape(videoFrame, 'Polygon', bboxPolygon, 'LineWidth', 3);

            % Display tracked points.
            videoFrame = insertMarker(videoFrame, visiblePoints, '+', 'Color', 'white');
            
            % Overlay the medical image
            xray_x = floor(xray_point(1));
            xray_y = floor(xray_point(2));
            videoFrame = imoverlay(videoFrame, transformed_dental_img, [xray_y xray_x]);
            
            % Save some points as test points
%             if frameCount == 100
%                 oldPoints_at_f100 = oldPoints;
%                 visiblePoints_at_f100 = visiblePoints;
%             end
%             
%             if frameCount == 101
%                 oldPoints_at_f101 = oldPoints;
%                 visiblePoints_at_f101 = visiblePoints;
%             end
%     
%             if frameCount == 150
%                 oldPoints_at_f150 = oldPoints;
%                 visiblePoints_at_f150 = visiblePoints;
%             end
%             
%             if frameCount == 151
%                 oldPoints_at_f151 = oldPoints;
%                 visiblePoints_at_f151 = visiblePoints;
%             end
%     
%             if frameCount == 200
%                 oldPoints_at_f200 = oldPoints;
%                 visiblePoints_at_f200 = visiblePoints;
%             end
%             
%             if frameCount == 201
%                 oldPoints_at_f201 = oldPoints;
%                 visiblePoints_at_f201 = visiblePoints;
%             end
            
            % Reset the points.
            oldPoints = visiblePoints;
            setPoints(pointTracker, oldPoints);
        end
    end
    
    % Save some annotated frames as test images.
%     if frameCount == 100
%         annotatedFrame100 = videoFrame;
%     end
%     
%     if frameCount == 101
%         annotatedFrame101 = videoFrame;
%     end
%     
%     if frameCount == 150
%         annotatedFrame150 = videoFrame;
%     end
%     
%     if frameCount == 151
%         annotatedFrame151 = videoFrame;
%     end
%     
%     if frameCount == 200
%         annotatedFrame200 = videoFrame;
%     end
%     
%     if frameCount == 201
%         annotatedFrame201 = videoFrame;
%     end
    
    % Display the annotated video frame using the video player object.
    step(videoPlayer, videoFrame);

    % Check whether the video player window has been closed.
    runLoop = isOpen(videoPlayer);
    
    % Increment frame count
    frameCount = frameCount +1;
end


% Clean up
clear cam;
release(videoPlayer);
release(pointTracker);
release(faceDetector);