import numpy as np
import request
import cv2
# from skimage.measure import compare_ssim
import time


cap = cv2.VideoCapture(1)

firstTime = 1
diffCounter = 0

while(True):
    # Capture frame-by-frame
    ret, frame = cap.read()

    # Our operations on the frame come here
    grayNow = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    # if (firstTime == 1):
    #     grayPrev = grayNow
    #     firstTime = 0
    # (score, diff) = compare_ssim(grayNow, grayPrev, full=True)
    # diff = (diff * 255).astype("uint8")
    # if score < 0.8:
    #     print('DIFFERENT! {}'.format(diffCounter))
    #     diffCounter = diffCounter + 1
    # print("SSIM: {}".format(diff))

    # Display the resulting frame
    cv2.imshow('frame', frame)
    cv2.imwrite('frame.jpg', frame)
    request.post("http://localhost:8000/")
    time.sleep(1)
    # grayPrev = grayNow
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# When everything done, release the capture
cap.release()
cv2.destroyAllWindows()
