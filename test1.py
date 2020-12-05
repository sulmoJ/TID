class Shape:
    def __init__(self,x,y,width,height):
        self.x = x
        self.y = y
        self.w = width
        self.h = height

class Rectangle(Shape):
    def __init__(self,x,y,width,height):
        super().__init__(x,y,width,height)

    def draw(self):
        print('Rectangle :',self.x,self.y,self.w,self.h)

class Circle(Shape):
    def __init__(self,x,y,width,height):
        super().__init__(x,y,width,height)

    def draw(self):
        print('Circle :',self.x,self.y,self.w,self.h)

class Slide():
    def __init__(self):
        self.list = []

    def add(self,a):
        self.list.append(a)

    def paint(self):
        for r in self.list:
            r.draw()


